import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { deployments } from './src/db/drizzle/schema';
import { desc } from 'drizzle-orm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzleService = app.get(DrizzleService);

    const lastDeployments = await drizzleService.db
        .select()
        .from(deployments)
        .orderBy(desc(deployments.createdAt))
        .limit(5);

    console.log('Last deployments:', JSON.stringify(lastDeployments, null, 2));

    await app.close();
}

bootstrap();
