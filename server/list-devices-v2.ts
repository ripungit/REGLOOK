import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { cocktailDevices } from './src/db/drizzle/schema/cocktail';
import { desc } from 'drizzle-orm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzleService = app.get(DrizzleService);

    const devices = await drizzleService.db.select().from(cocktailDevices).orderBy(desc(cocktailDevices.lastSeenAt));

    console.log('--- DEVICES START ---');
    devices.forEach(d => {
        console.log(`ID: ${d.id}, Status: ${d.status}, LastSeen: ${d.lastSeenAt}, Name: ${d.name}`);
    });
    console.log('--- DEVICES END ---');

    await app.close();
}

bootstrap().catch(err => console.error(err));
