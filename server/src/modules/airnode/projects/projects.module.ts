import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DbModule } from '../../../db/db.module';
import { PlatformAuthModule } from '../../../platform/auth/auth.module';

@Module({
  imports: [DbModule, PlatformAuthModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}