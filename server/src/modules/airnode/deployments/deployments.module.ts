import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DeploymentsController } from './deployments.controller';
import { DeploymentsService } from './deployments.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { PlatformAuthModule } from 'src/platform/auth/auth.module';

@Module({
  imports: [DbModule, SchedulerModule, PlatformAuthModule],
  controllers: [DeploymentsController],
  providers: [DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}