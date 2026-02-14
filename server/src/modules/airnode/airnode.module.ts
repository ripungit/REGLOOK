import { Module } from '@nestjs/common';
import { DeploymentsModule } from './deployments/deployments.module';
import { SourcesModule } from './sources/sources.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [DeploymentsModule, SourcesModule, ProjectsModule],
  exports: [DeploymentsModule, SourcesModule, ProjectsModule],
})
export class AirnodeModule {}