import { Module } from '@nestjs/common';
import { CliAuthService } from './cli-auth.service';
import { CliAuthController } from './cli-auth.controller';
import { DbModule } from '../../db/db.module';
import { ConfigModule } from '@nestjs/config';
import { PlatformAuthModule } from '../../platform/auth/auth.module';
import { SecurityModule } from '../../platform/security/security.module';

@Module({
  imports: [DbModule, ConfigModule, PlatformAuthModule, SecurityModule],
  controllers: [CliAuthController],
  providers: [CliAuthService],
})
export class CliAuthModule {}