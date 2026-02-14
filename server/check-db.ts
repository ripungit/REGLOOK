
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { cocktailDevices, cocktailMetricsLatest } from './src/db/drizzle/schema/cocktail';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzle = app.get(DrizzleService);
    const db = drizzle.db;

    const devices = await db.select().from(cocktailDevices);
    console.log('--- DEVICES COUNT: ' + devices.length);
    for (const d of devices) {
        console.log(`Device: ${d.id}, Name: ${d.name}, LastSeen: ${d.lastSeenAt}`);
    }

    const metrics = await db.select().from(cocktailMetricsLatest);
    console.log('--- METRICS COUNT: ' + metrics.length);
    for (const m of metrics) {
        console.log(`Metrics for Device: ${m.deviceId}, UpdatedAt: ${m.updatedAt}`);
        console.log('Data:', JSON.stringify(m.metrics));
    }

    await app.close();
}

bootstrap();
