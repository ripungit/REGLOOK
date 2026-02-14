import { z } from 'zod';

// Base schema for existing application
const baseSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default('9000'),
    DATABASE_URL: z.string().url(),
    CORS_ORIGIN: z.string().url().default('http://localhost:3000'),
    SESSION_TTL_SECONDS: z.string().transform(Number).default('604800'),
    COOKIE_SECURE: z.string().transform((val) => val === 'true').default('false'),
    COOKIE_SAMESITE: z.enum(['lax', 'strict', 'none']).default('lax'),
    RP_NAME: z.string().default('Sandbox'),
    RP_ID: z.string().default('localhost'),
    RP_ORIGIN: z.string().url().default('http://localhost:3000'),
    WEBAUTHN_CHALLENGE_TTL_SECONDS: z.string().transform(Number).default('300'),
});

// Airnode-specific schema
const airnodeSchema = z.object({
    // Airnode Control Plane specific
    AIRNODE_PORT: z.string().transform(Number).default('9100'),
    TOKEN_PEPPER: z.string().default('change-me-long-random'),

    // R2 Configuration
    R2_ACCOUNT_ID: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
    R2_BUCKET: z.string().default('airnode'),
    R2_PUBLIC_BASE_URL: z.string().url().optional().or(z.literal('')).default(''),
    R2_REGION: z.string().default('auto'),

    // Domain Configuration
    BASE_DOMAIN: z.string().default('reglook.com'),
    NODE_SUBDOMAIN_SUFFIX: z.string().default('reglook.com'),
    DEFAULT_NODE_NAME: z.string().default('airnode1'),
    HOSTNAME_STYLE: z.enum(['node', 'stable']).default('node'),

    // Scheduler Configuration
    HEARTBEAT_STALE_SECONDS: z.string().transform(Number).default('15'),
    WEBAUTHN_NOT_USED: z.string().transform((val) => val === 'true').default('true'),

    // Admin Configuration
    ADMIN_USERNAMES: z.string().optional().default(''),
});

// Cockpit Schema
const cockpitSchema = z.object({
    COCKPIT_SECRET_KEY: z.string().min(32, 'Secret key must be at least 32 characters'),
});

// Combine schemas
export const envSchema = baseSchema.merge(airnodeSchema).merge(cockpitSchema);

export type Env = z.infer<typeof envSchema>;

export function ConfigFactory() {
    return {
        isGlobal: true,
        envFilePath: '.env',
        validate: (config: Record<string, unknown>) => {
            const result = envSchema.safeParse(config);
            if (!result.success) {
                console.error('❌ Invalid environment variables:');
                console.error(result.error.format());
                throw new Error('Invalid environment variables');
            }
            return result.data;
        },
    };
}