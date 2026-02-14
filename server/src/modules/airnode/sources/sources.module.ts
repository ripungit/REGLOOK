import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { PlatformAuthModule } from 'src/platform/auth/auth.module';

@Module({
  imports: [DbModule, SchedulerModule, PlatformAuthModule],
  controllers: [SourcesController],
  providers: [SourcesService],
  exports: [SourcesService],
})
export class SourcesModule {}