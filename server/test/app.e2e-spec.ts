import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/platform/http/filters/all-exceptions.filter';

describe('App (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        app.useGlobalFilters(new AllExceptionsFilter());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Health', () => {
        it('GET / should return health status', () => {
            return request(app.getHttpServer())
                .get('/')
                .expect(200)
                .expect((res) => {
                    expect(res.body.status).toBe('ok');
                    expect(res.body.service).toBe('api');
                    expect(res.body.timestamp).toBeDefined();
                });
        });
    });

    describe('Auth', () => {
        it('GET /auth/csrf should set csrf cookie', () => {
            return request(app.getHttpServer())
                .get('/auth/csrf')
                .expect(200)
                .expect((res) => {
                    expect(res.body.ok).toBe(true);
                    const cookies = res.headers['set-cookie'];
                    expect(cookies).toBeDefined();
                    expect(cookies.some((c: string) => c.startsWith('csrf_token='))).toBe(true);
                });
        });

        it('POST /auth/signup/start should create user', async () => {
            const uniqueId = Date.now();
            const res = await request(app.getHttpServer())
                .post('/auth/signup/start')
                .send({
                    firstName: 'Test',
                    lastName: 'User',
                    email: `test${uniqueId}@example.com`,
                    username: `testuser${uniqueId}`,
                    marketingOptIn: false,
                })
                .expect(201);

            expect(res.body.userId).toBeDefined();
        });

        it('GET /auth/me should require authentication', () => {
            return request(app.getHttpServer())
                .get('/auth/me')
                .expect(401);
        });
    });
});
