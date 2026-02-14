import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { PlatformAuthModule } from 'src/platform/auth/auth.module';
import { SchedulerModule } from '../airnode/scheduler/scheduler.module';

@Module({
  imports: [PlatformAuthModule, SchedulerModule],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule { }