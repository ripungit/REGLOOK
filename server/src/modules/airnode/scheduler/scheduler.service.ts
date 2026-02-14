import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and, desc, lt } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import { nodes, nodeHeartbeats, placements } from 'src/db/drizzle/schema';
import { calculateNodeScore } from './scoring.util';

@Injectable()
export class SchedulerService {
  constructor(
    private drizzleService: DrizzleService,
    private configService: ConfigService,
  ) {}

  async selectNodeForDeployment(projectId: string, environmentId: string) {
    // Check if there's an existing placement for this project/environment (sticky placement)
    const existingPlacement = await this.drizzleService.db
      .select({
        nodeId: placements.nodeId,
      })
      .from(placements)
      .where(
        and(
          eq(placements.projectId, projectId),
          eq(placements.environmentId, environmentId)
        )
      )
      .limit(1);

    if (existingPlacement.length > 0) {
      // Check if the existing node is still healthy
      const nodeResult = await this.drizzleService.db
        .select()
        .from(nodes)
        .where(eq(nodes.id, existingPlacement[0].nodeId))
        .limit(1);

      if (nodeResult.length > 0) {
        const node = nodeResult[0];
        
        // Check if node is still healthy (active and not stale)
        const heartbeat = await this.getNodeLatestHeartbeat(node.id);
        
        if (this.isNodeHealthy(node, heartbeat)) {
          return node; // Stick with the same node
        }
      }
    }

    // No existing placement or node is unhealthy, find the best node
    return await this.findBestNode();
  }

  private async getNodeLatestHeartbeat(nodeId: string) {
    const heartbeats = await this.drizzleService.db
      .select()
      .from(nodeHeartbeats)
      .where(eq(nodeHeartbeats.nodeId, nodeId))
      .orderBy(desc(nodeHeartbeats.ts))
      .limit(1);

    return heartbeats.length > 0 ? heartbeats[0] : null;
  }

  private isNodeHealthy(node: typeof nodes.$inferSelect, heartbeat: any) {
    if (!heartbeat) {
      return false; // No heartbeat means unhealthy
    }

    // Check if heartbeat is stale
    const heartbeatStaleSeconds = this.configService.get<number>('HEARTBEAT_STALE_SECONDS', 15);
    const staleThreshold = new Date();
    staleThreshold.setSeconds(staleThreshold.getSeconds() - heartbeatStaleSeconds);

    if (heartbeat.ts < staleThreshold) {
      return false; // Heartbeat is too old
    }

    // Check if node is active
    if (node.status !== 'active') {
      return false;
    }

    // Check if node has free runtime slots
    if (heartbeat.runtimeSlotsUsed !== null && heartbeat.runtimeSlotsUsed >= node.runtimeSlotsTotal) {
      return false;
    }

    return true;
  }

  private async findBestNode() {
    // Get all active nodes
    const allNodes = await this.drizzleService.db
      .select()
      .from(nodes)
      .where(eq(nodes.status, 'active'));

    // For each node, get the latest heartbeat
    const nodeScores: Array<{ node: typeof nodes.$inferSelect; score: number }> = [];

    for (const node of allNodes) {
      const heartbeat = await this.getNodeLatestHeartbeat(node.id);
      const score = calculateNodeScore(node, heartbeat);
      
      if (score !== Infinity) { // Only consider nodes that are usable
        nodeScores.push({ node, score });
      }
    }

    // Sort by score (ascending - lower scores are better)
    nodeScores.sort((a, b) => a.score - b.score);

    // Return the best node
    return nodeScores.length > 0 ? nodeScores[0].node : null;
  }
}