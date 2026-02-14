import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';
import { HttpModule } from '../../platform/http/http.module';
import { PlatformAuthModule } from '../../platform/auth/auth.module';
import { SecurityModule } from '../../platform/security/security.module';

@Module({
    imports: [HttpModule, PlatformAuthModule, SecurityModule],
    controllers: [ManagementController],
    providers: [ManagementService],
})
export class ManagementModule { }