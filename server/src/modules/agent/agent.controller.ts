import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Request } from 'express';
import { AgentService } from './agent.service';
import { AgentAuthGuard } from 'src/platform/auth/guards/agent-auth.guard';

interface TaskStatusDto {
  status: string;
  message?: string;
  error?: string;
}

interface DeploymentLogDto {
  logs: Array<{ level: string; message: string; ts?: string | Date }>;
}

interface RuntimeReadyDto {
  nodeName: string;
  hostname: string;
  target: { type: string; containerId: string; routerName: string };
  health: { ok: boolean };
}

interface RuntimeFailedDto {
  error: string;
}

interface HeartbeatDto {
  cpuPercent?: number;
  ramUsedMb?: number;
  ramTotalMb?: number;
  diskFreeGb?: number;
  buildSlotsUsed?: number;
  runtimeSlotsUsed?: number;
}

@SkipThrottle()
@Controller('agent')
@UseGuards(AgentAuthGuard)
export class AgentController {
  constructor(private agentService: AgentService) { }

  @Post('heartbeat')
  async heartbeat(@Req() req: Request, @Body() body: HeartbeatDto) {
    const nodeId = (req as any).node.id;
    return await this.agentService.heartbeat(nodeId, body);
  }

  @Post('tasks/poll')
  async pollTasks(@Req() req: Request) {
    const nodeId = (req as any).node.id;
    return await this.agentService.pollTasks(nodeId);
  }

  @Post('tasks/:id/lease/extend')
  async extendLease(@Req() req: Request, @Param('id') taskId: string) {
    const nodeId = (req as any).node.id;
    return await this.agentService.extendLease(taskId, nodeId);
  }

  @Post('tasks/:id/status')
  async updateTaskStatus(
    @Req() req: Request,
    @Param('id') taskId: string,
    @Body() body: TaskStatusDto
  ) {
    const nodeId = (req as any).node.id;
    return await this.agentService.updateTaskStatus(
      taskId,
      nodeId,
      body.status,
      body.message,
      body.error
    );
  }

  @Post('deployments/:deploymentId/logs')
  async addDeploymentLogs(
    @Req() req: Request,
    @Param('deploymentId') deploymentId: string,
    @Body() body: DeploymentLogDto
  ) {
    return await this.agentService.addDeploymentLogs(deploymentId, body.logs);
  }

  @Post('deployments/:deploymentId/runtime/ready')
  async markRuntimeReady(
    @Req() req: Request,
    @Param('deploymentId') deploymentId: string,
    @Body() body: RuntimeReadyDto
  ) {
    return await this.agentService.markRuntimeReady(
      deploymentId,
      body.nodeName,
      body.hostname,
      body.target,
      body.health
    );
  }

  @Post('deployments/:deploymentId/runtime/failed')
  async markRuntimeFailed(
    @Req() req: Request,
    @Param('deploymentId') deploymentId: string,
    @Body() body: RuntimeFailedDto
  ) {
    return await this.agentService.markRuntimeFailed(deploymentId, body.error);
  }
}