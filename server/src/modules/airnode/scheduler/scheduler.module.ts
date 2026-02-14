import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db/db.module';
import { R2Service } from './r2.service';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ConfigModule, DbModule],
  providers: [R2Service, SchedulerService],
  exports: [R2Service, SchedulerService],
})
export class SchedulerModule {}