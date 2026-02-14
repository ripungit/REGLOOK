import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { CocktailService } from './src/modules/cocktail/cocktail.service';
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { cocktailDevices } from './src/db/drizzle/schema/cocktail';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzleService = app.get(DrizzleService);

    const devices = await drizzleService.db.select().from(cocktailDevices);
    console.log('Devices:', JSON.stringify(devices, null, 2));

    await app.close();
}

bootstrap().catch(err => console.error(err));
