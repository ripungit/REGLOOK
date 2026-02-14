import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { HttpModule } from '../../platform/http/http.module';
import { PlatformAuthModule } from '../../platform/auth/auth.module';
import { SecurityModule } from '../../platform/security/security.module';

@Module({
    imports: [HttpModule, PlatformAuthModule, SecurityModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule { }