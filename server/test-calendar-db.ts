import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { calendarEvents } from './src/db/drizzle/schema/calendar_events';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
    console.log('Starting DB check...');
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzle = app.get(DrizzleService);
    const db = drizzle.db;

    try {
        const events = await db.select().from(calendarEvents);
        console.log('--- CALENDAR EVENTS COUNT: ' + events.length);
    } catch (e: any) {
        console.error('--- CALENDAR TABLE ERROR:', e.message);
    }

    await app.close();
}

bootstrap();
