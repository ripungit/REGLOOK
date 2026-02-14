import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
import { LoggingModule } from './platform/logging/logging.module';
import { HttpModule } from './platform/http/http.module';
import { DbModule } from './db/db.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformAuthModule } from './platform/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ManagementModule } from './modules/management/management.module';
import { AirnodeModule } from './modules/airnode/airnode.module';
import { AgentModule } from './modules/agent/agent.module';
import { CliAuthModule } from './modules/cli-auth/cli-auth.module';
import { CockpitModule } from './modules/cockpit/cockpit.module';
import { CocktailModule } from './modules/cocktail/cocktail.module';
import { CalendarModule } from './modules/calendar/calendar.module';

@Module({
    imports: [
        // Core modules
        ConfigModule,
        LoggingModule,
        HttpModule,
        DbModule,
        // Feature modules
        HealthModule,
        AuthModule,
        PlatformAuthModule,
        UsersModule,
        ProjectsModule,
        ManagementModule,
        AirnodeModule,
        AgentModule,
        CliAuthModule,
        CockpitModule,
        CocktailModule,
        CalendarModule,
    ],
    providers: [],
})
export class AppModule { }
