import { Controller, Post, Get, Body, Param, UseGuards, Req, Sse, MessageEvent } from '@nestjs/common';
import { Request } from 'express';
import { Observable, interval, map, switchMap, startWith, scan, filter } from 'rxjs';
import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { BearerAuthGuard } from 'src/platform/auth/guards/bearer-auth.guard';

@Controller('airnode/deployments')
export class DeploymentsController {
  constructor(private deploymentsService: DeploymentsService) { }

  @Post()
  @UseGuards(BearerAuthGuard)
  async createDeployment(@Req() req: Request, @Body() createDeploymentDto: CreateDeploymentDto) {
    const userId = (req as any).user.id;
    return await this.deploymentsService.createDeployment(
      userId,
      createDeploymentDto.projectId,
      createDeploymentDto.environmentName,
      createDeploymentDto.source,
      createDeploymentDto.depsHash,
      createDeploymentDto.framework,
      createDeploymentDto.packageManager,
      createDeploymentDto.buildSpec,
      createDeploymentDto.healthcheck
    );
  }

  @Get(':id')
  @UseGuards(BearerAuthGuard)
  async getDeployment(@Req() req: Request, @Param('id') id: string) {
    const userId = (req as any).user.id;
    return await this.deploymentsService.getDeploymentById(id, userId);
  }

  @Sse(':id/logs/stream')
  @UseGuards(BearerAuthGuard)
  streamLogs(@Req() req: Request, @Param('id') id: string): Observable<MessageEvent> {
    // Poll for logs and only emit new ones
    return interval(2000).pipe(
      startWith(0),
      switchMap(() => this.deploymentsService.getDeploymentLogsDirect(id)),
      scan((acc, logs) => {
        const newLogs = logs.filter(log => !acc.set.has(log.id));
        newLogs.forEach(log => acc.set.add(log.id));
        return { set: acc.set, emit: newLogs };
      }, { set: new Set<string>(), emit: [] as any[] }),
      filter(acc => acc.emit.length > 0),
      switchMap(acc => acc.emit.map(log => ({
        data: JSON.stringify({
          message: log.message,
          level: log.level,
          timestamp: log.ts
        })
      } as MessageEvent)))
    );
  }
}