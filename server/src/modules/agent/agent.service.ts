import { Injectable } from '@nestjs/common';
import { eq, and, or, lt, desc } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import {
  buildTasks,
  deployments,
  environments,
  projects,
  users,
  nodes,
  nodeHeartbeats,
  envVars,
  artifacts,
  deploymentLogs,
  placements
} from 'src/db/drizzle/schema';
import { ConfigService } from '@nestjs/config';
import { R2Service } from '../airnode/scheduler/r2.service';

@Injectable()
export class AgentService {
  constructor(
    private drizzleService: DrizzleService,
    private configService: ConfigService,
    private r2Service: R2Service,
  ) { }

  async heartbeat(nodeId: string, data: any) {
    await this.drizzleService.db.insert(nodeHeartbeats).values({
      nodeId,
      cpuPercent: data.cpuPercent,
      ramUsedMb: data.ramUsedMb,
      ramTotalMb: data.ramTotalMb,
      diskFreeGb: data.diskFreeGb,
      buildSlotsUsed: data.buildSlotsUsed,
      runtimeSlotsUsed: data.runtimeSlotsUsed,
    });

    // Update node's updatedAt timestamp
    await this.drizzleService.db
      .update(nodes)
      .set({ updatedAt: new Date() })
      .where(eq(nodes.id, nodeId));

    return { ok: true };
  }

  async pollTasks(nodeId: string) {
    // Get queued tasks assigned to this node
    const tasks = await this.drizzleService.db
      .select({
        id: buildTasks.id,
        deploymentId: buildTasks.deploymentId,
        type: buildTasks.type,
        status: buildTasks.status,
        payload: buildTasks.payload,
      })
      .from(buildTasks)
      .where(
        and(
          eq(buildTasks.nodeId, nodeId),
          eq(buildTasks.status, 'queued')
        )
      )
      .orderBy(desc(buildTasks.createdAt))
      .limit(5); // Return at most 5 tasks

    // Lease the tasks (update status to 'leased' with expiry)
    const taskIds = tasks.map(task => task.id);
    if (taskIds.length > 0) {
      const leaseExpiry = new Date();
      leaseExpiry.setSeconds(leaseExpiry.getSeconds() + 60); // 60 seconds lease

      await this.drizzleService.db
        .update(buildTasks)
        .set({
          status: 'leased',
          leaseExpiresAt: leaseExpiry,
        })
        .where(
          and(
            eq(buildTasks.nodeId, nodeId),
            or(...taskIds.map(id => eq(buildTasks.id, id)))
          )
        );
    }

    // For each task, fetch the complete task payload
    const taskPayloads = [];
    for (const task of tasks) {
      // Get deployment details
      const deploymentResult = await this.drizzleService.db
        .select()
        .from(deployments)
        .where(eq(deployments.id, task.deploymentId))
        .limit(1);

      if (deploymentResult.length === 0) continue;

      const deployment = deploymentResult[0];

      // Get project details
      const projectResult = await this.drizzleService.db
        .select({
          id: projects.id,
          slug: projects.slug,
          ownerUserId: projects.ownerUserId,
        })
        .from(projects)
        .where(eq(projects.id, deployment.projectId))
        .limit(1);

      if (projectResult.length === 0) continue;

      const project = projectResult[0];

      // Get user details to form the hostname
      const userResult = await this.drizzleService.db
        .select({ username: users.username })
        .from(users)
        .where(eq(users.id, project.ownerUserId))
        .limit(1);

      if (userResult.length === 0) continue;

      // Get environment details
      const environmentResult = await this.drizzleService.db
        .select({
          id: environments.id,
          name: environments.name,
        })
        .from(environments)
        .where(eq(environments.id, deployment.environmentId))
        .limit(1);

      if (environmentResult.length === 0) continue;

      const environment = environmentResult[0];

      // Get placement details for hostname
      const placementResult = await this.drizzleService.db
        .select({ hostname: placements.hostname })
        .from(placements)
        .where(
          and(
            eq(placements.projectId, deployment.projectId),
            eq(placements.environmentId, deployment.environmentId)
          )
        )
        .limit(1);

      if (placementResult.length === 0) continue;

      const hostname = placementResult[0].hostname;

      // Get environment variables for the environment
      const envVarsList = await this.drizzleService.db
        .select({
          key: envVars.key,
          value: envVars.valueEncrypted, // In real implementation, decrypt
          isSecret: envVars.isSecret,
        })
        .from(envVars)
        .where(eq(envVars.environmentId, environment.id));

      // Get presigned source URL
      const r2Key = `sources/${project.id}/${deployment.sourceHash}.tar.gz`;
      const { url: downloadUrl } = await this.r2Service.generateSourcePresignedGetUrl(r2Key);

      // Form the task payload
      taskPayloads.push({
        taskId: task.id,
        type: task.type.toUpperCase(),
        deploymentId: task.deploymentId,
        project: {
          id: project.id,
          slug: project.slug,
          ownerUsername: userResult[0].username,
        },
        environment: {
          id: environment.id,
          name: environment.name,
        },
        hostname,
        source: {
          mode: deployment.sourceHash ? 'r2' : 'none',
          downloadUrl: deployment.sourceHash ? downloadUrl : undefined,
          r2Key: deployment.sourceHash ? r2Key : undefined,
          sourceHash: deployment.sourceHash,
        },
        depsHash: deployment.depsHash,
        artifactUpload: {
          r2Key: `artifacts/${project.id}/${deployment.id}/${deployment.sourceHash || 'unknown'}.tar.gz`,
        },
        artifactPut: {
          url: (await this.r2Service.generatePresignedUrl(this.configService.get('R2_BUCKET') || 'airnode', `artifacts/${project.id}/${deployment.id}/${deployment.sourceHash || 'unknown'}.tar.gz`, 3600, 'PUT', 'application/gzip')).url,
          r2Key: `artifacts/${project.id}/${deployment.id}/${deployment.sourceHash || 'unknown'}.tar.gz`,
        },
        envVars: envVarsList,
        runtime: {
          type: 'docker',
          exposePort: 3000,
        },
        routing: {
          provider: 'traefik',
          routerName: hostname,
        },
        payload: task.payload,
      });
    }

    return taskPayloads;
  }

  async extendLease(taskId: string, nodeId: string) {
    const leaseExpiry = new Date();
    leaseExpiry.setSeconds(leaseExpiry.getSeconds() + 60); // Extend for 60 more seconds

    const result = await this.drizzleService.db
      .update(buildTasks)
      .set({
        leaseExpiresAt: leaseExpiry,
      })
      .where(
        and(
          eq(buildTasks.id, taskId),
          eq(buildTasks.nodeId, nodeId)
        )
      )
      .returning();

    return result.length > 0;
  }

  async updateTaskStatus(taskId: string, nodeId: string, status: string, message?: string, error?: string) {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (message) updateData.message = message;
    if (error) updateData.error = error;

    const result = await this.drizzleService.db
      .update(buildTasks)
      .set(updateData)
      .where(
        and(
          eq(buildTasks.id, taskId),
          eq(buildTasks.nodeId, nodeId)
        )
      )
      .returning();

    return result.length > 0;
  }

  async addDeploymentLogs(deploymentId: string, logs: Array<{ level: string; message: string; ts?: string | Date }>) {
    const logEntries = logs.map(log => ({
      deploymentId,
      level: log.level,
      message: log.message,
      ts: log.ts ? (typeof log.ts === 'string' ? new Date(log.ts) : log.ts) : new Date(),
    }));

    await this.drizzleService.db.insert(deploymentLogs).values(logEntries);
    return { ok: true };
  }

  async markRuntimeReady(
    deploymentId: string,
    nodeName: string,
    hostname: string,
    target: { type: string; containerId: string; routerName: string },
    health: { ok: boolean }
  ) {
    // Update deployment status to ready
    await this.drizzleService.db
      .update(deployments)
      .set({
        status: 'ready',
        finishedAt: new Date(),
      })
      .where(eq(deployments.id, deploymentId));

    // Update placement to point to this deployment
    await this.drizzleService.db
      .update(placements)
      .set({
        activeDeploymentId: deploymentId,
        updatedAt: new Date(),
      })
      .where(eq(placements.hostname, hostname));

    return { ok: true };
  }

  async markRuntimeFailed(deploymentId: string, error: string) {
    // Update deployment status to failed
    await this.drizzleService.db
      .update(deployments)
      .set({
        status: 'failed',
        finishedAt: new Date(),
      })
      .where(eq(deployments.id, deploymentId));

    // Add error log
    await this.drizzleService.db.insert(deploymentLogs).values({
      deploymentId,
      level: 'error',
      message: error,
      ts: new Date(),
    });

    return { ok: true };
  }
}