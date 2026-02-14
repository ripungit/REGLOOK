
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { cocktailTasks } from './src/db/drizzle/schema/cocktail';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { desc } from 'drizzle-orm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzle = app.get(DrizzleService);
    const db = drizzle.db;

    const tasks = await db.select()
        .from(cocktailTasks)
        .orderBy(desc(cocktailTasks.createdAt))
        .limit(10);

    console.log('--- RECENT TASKS: ' + tasks.length);
    for (const t of tasks) {
        console.log(`Task: ${t.id}, Type: ${t.type}, Status: ${t.status}, Error: ${t.error}, CreatedAt: ${t.createdAt}`);
        if (t.result) {
            console.log('Result (truncated):', JSON.stringify(t.result).substring(0, 200));
        }
    }

    await app.close();
}

bootstrap();
