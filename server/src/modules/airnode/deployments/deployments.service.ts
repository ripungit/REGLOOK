import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and, or } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import {
  projects,
  environments,
  deployments,
  placements,
  nodes,
  buildTasks,
  users,
  envVars,
  deploymentLogs
} from 'src/db/drizzle/schema';
import { generateRandomString } from 'src/common/utils/strings.util';
import { SchedulerService } from '../scheduler/scheduler.service';
import { R2Service } from '../scheduler/r2.service';

@Injectable()
export class DeploymentsService {
  constructor(
    private drizzleService: DrizzleService,
    private configService: ConfigService,
    private schedulerService: SchedulerService,
    private r2Service: R2Service,
  ) { }

  async createDeployment(
    userId: string,
    projectId: string,
    environmentName: string,
    source?: { r2Key: string; sourceHash: string },
    depsHash?: string,
    framework?: string,
    packageManager?: 'npm' | 'pnpm' | 'yarn',
    buildSpec?: any,
    healthcheck?: any,
  ) {
    // Validate that project belongs to user
    const projectResult = await this.drizzleService.db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.ownerUserId, userId)
        )
      )
      .limit(1);

    if (projectResult.length === 0) {
      throw new Error('Project not found or does not belong to user');
    }

    const project = projectResult[0];

    // Get environment
    const environmentResult = await this.drizzleService.db
      .select()
      .from(environments)
      .where(
        and(
          eq(environments.projectId, projectId),
          eq(environments.name, environmentName)
        )
      )
      .limit(1);

    if (environmentResult.length === 0) {
      throw new Error(`Environment '${environmentName}' not found for project`);
    }

    const environment = environmentResult[0];

    // Choose node using scheduler (placement + health + scoring)
    const node = await this.schedulerService.selectNodeForDeployment(
      project.id,
      environment.id
    );

    if (!node) {
      throw new Error('No suitable node available for deployment');
    }

    // Ensure placement exists
    let placement = await this.drizzleService.db
      .select()
      .from(placements)
      .where(
        and(
          eq(placements.projectId, projectId),
          eq(placements.environmentId, environment.id)
        )
      )
      .limit(1);

    let hostname: string;
    if (placement.length > 0) {
      // Use existing placement
      hostname = placement[0].hostname;
    } else {
      // Create new placement with hostname
      const username = await this.getUsernameById(userId);
      const baseDomain = this.configService.get('BASE_DOMAIN');
      const nodeName = node.name;

      hostname = `${username}-${project.slug}.${nodeName}.${baseDomain}`;

      // Create placement
      const [newPlacement] = await this.drizzleService.db
        .insert(placements)
        .values({
          projectId,
          environmentId: environment.id,
          nodeId: node.id,
          hostname,
        })
        .returning();

      placement = [newPlacement];
    }

    // Create deployment
    const [newDeployment] = await this.drizzleService.db
      .insert(deployments)
      .values({
        projectId,
        environmentId: environment.id,
        status: 'queued',
        sourceHash: source?.sourceHash,
        depsHash,
        assignedNodeId: node.id,
      })
      .returning();

    // Get environment variables
    const envVarsResult = await this.drizzleService.db
      .select({
        key: envVars.key,
        value: envVars.valueEncrypted,
      })
      .from(envVars)
      .where(eq(envVars.environmentId, environment.id));

    const envVarsMap = envVarsResult.reduce((acc, envVar) => {
      acc[envVar.key] = envVar.value;
      return acc;
    }, {} as Record<string, string>);

    // Generate presigned GET url for the source object
    let sourceDownloadUrl = null;
    if (source?.r2Key) {
      const { url } = await this.r2Service.generateSourcePresignedGetUrl(source.r2Key, 1800); // 30 minutes
      sourceDownloadUrl = url;
    }

    // Create payload for the agent
    const payload = {
      source: source?.r2Key ? {
        mode: "r2",
        r2Key: source.r2Key,
        downloadUrl: sourceDownloadUrl,
      } : null,
      depsHash,
      buildSpec: buildSpec || null,
      healthcheck: healthcheck || null,
      envVars: envVarsMap,
      hostname,
      routing: {
        hostname,
      },
      runtime: {
        // Add runtime configuration if needed
      },
      artifactPut: {
        // This would be the artifact upload configuration
        // For now, we'll leave it as a placeholder
      },
      framework: framework || null,
      packageManager: packageManager || null,
    };

    // Create build task
    const [newBuildTask] = await this.drizzleService.db
      .insert(buildTasks)
      .values({
        deploymentId: newDeployment.id,
        nodeId: node.id,
        type: 'build_and_deploy',
        status: 'queued',
        payload,
      })
      .returning();

    // Generate presigned R2 URL for artifact upload
    const r2Key = `artifacts/${projectId}/${newDeployment.id}/${generateRandomString(16)}.tar.gz`;

    // In a real implementation, we would generate the presigned URL here
    // For now, we'll return placeholder data
    const artifactUpload = {
      url: `https://r2-upload-placeholder-url/${r2Key}`, // This would be the actual presigned URL
      r2Key,
    };

    return {
      id: newDeployment.id,
      status: newDeployment.status,
      assignedNode: {
        name: node.name,
        baseDomain: node.baseDomain,
      },
      hostname,
      artifactUpload,
      taskId: newBuildTask.id,
    };
  }

  async getDeploymentById(deploymentId: string, userId: string) {
    const result = await this.drizzleService.db
      .select({
        id: deployments.id,
        projectId: deployments.projectId,
        environmentId: deployments.environmentId,
        status: deployments.status,
        sourceHash: deployments.sourceHash,
        depsHash: deployments.depsHash,
        assignedNodeId: deployments.assignedNodeId,
        createdAt: deployments.createdAt,
        startedAt: deployments.startedAt,
        finishedAt: deployments.finishedAt,
      })
      .from(deployments)
      .innerJoin(projects, eq(projects.id, deployments.projectId))
      .where(
        and(
          eq(deployments.id, deploymentId),
          eq(projects.ownerUserId, userId)
        )
      )
      .limit(1);

    if (result.length === 0) {
      throw new Error('Deployment not found');
    }

    return result[0];
  }

  async getDeploymentLogsDirect(deploymentId: string) {
    const logs = await this.drizzleService.db
      .select()
      .from(deploymentLogs)
      .where(eq(deploymentLogs.deploymentId, deploymentId))
      .orderBy(deploymentLogs.ts);

    return logs;
  }

  private async getUsernameById(userId: string): Promise<string> {
    const userResult = await this.drizzleService.db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userResult.length === 0) {
      throw new Error('User not found');
    }

    return userResult[0].username;
  }
}