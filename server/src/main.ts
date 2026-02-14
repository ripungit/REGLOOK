import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './platform/http/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    console.log(`Starting bootstrap... [${new Date().toISOString()}]`);
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: false });

    // Serve public files
    const publicPath = join(process.cwd(), 'public');
    console.log(`[StaticAssets] Serving from: ${publicPath}`);
    app.useStaticAssets(publicPath);

    // Enable WebSocket Adapter (ws)
    app.useWebSocketAdapter(new WsAdapter(app));

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 9100);
    const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');

    // Use Pino logger
    app.useLogger(app.get(Logger));

    // Security headers
    app.use(helmet());

    // Cookie parser
    app.use(cookieParser());

    // CORS with credentials
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'x-csrf-token', 'Authorization'],
    });

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Global exception filter
    app.useGlobalFilters(new AllExceptionsFilter());

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('Sandbox API')
        .setDescription('NestJS API with cookie sessions, CSRF, and WebAuthn passkeys')
        .setVersion('1.0')
        .addCookieAuth('sid')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Serve static files (for cocktail installer/binaries)
    // We need to cast or just use the underlying express instance if clearer, but standard nest way:
    // Actually, we need to type app as NestExpressApplication to use useStaticAssets
    // But since I can't easily change the create generic in a replace block without wide context change, 
    // I will checking if 'useStaticAssets' exists or use express directly if available? 
    // NestJS default is Express.
    // Let's modify the create call if possible, or simpler:
    // app.use('public', express.static(join(__dirname, '..', 'public')));
    // But I don't have express imported.
    // I'll assume NestExpressApplication is correct.

    // Better:
    // Modify the create line to <NestExpressApplication>
    // And add path join.

    // Let's do it in steps. First add imports.
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger docs at http://localhost:${port}/docs`);
}
bootstrap();
