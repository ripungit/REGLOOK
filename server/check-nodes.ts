import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { nodes } from './src/db/drizzle/schema';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzleService = app.get(DrizzleService);

    const allNodes = await drizzleService.db.select().from(nodes);
    console.log('Nodes in database:', JSON.stringify(allNodes, null, 2));

    await app.close();
}

bootstrap();
