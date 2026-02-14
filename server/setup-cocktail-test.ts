import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as dotenv from 'dotenv';
import { users } from './src/db/drizzle/schema/users';
import { cockpitVps } from './src/db/drizzle/schema/cockpit';
import { cocktailDevices, cocktailEnrollmentTokens } from './src/db/drizzle/schema/cocktail';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { addMinutes } from 'date-fns';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

async function main() {
    console.log('--- Setting up Cocktail Test Environment ---');

    // 1. Get or Create User
    let user = (await db.select().from(users).limit(1))[0];
    if (!user) {
        console.log('No user found, creating test user...');
        [user] = await db.insert(users).values({
            email: 'test@example.com',
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            passwordHash: 'placeholder', // wont work for login but ok for FK
            role: 'admin'
        }).returning();
    }
    console.log(`Using user: ${user.email} (${user.id})`);

    // 2. Create Verified VPS
    const vpsId = crypto.randomUUID();
    console.log(`Creating dummy VPS: ${vpsId}`);
    await db.insert(cockpitVps).values({
        id: vpsId,
        userId: user.id,
        name: 'Test VPS',
        host: '127.0.0.1',
        username: 'root',
        encryptedPassword: 'fake-encrypted-password',
        status: 'verified', // CRITICAL for enrollment
        serverFingerprint: 'fake-fingerprint'
    });

    // 3. Start Enrollment (Simulate API call)
    // We can just call the API logic manually here by inserting into DB
    const deviceId = crypto.randomUUID();
    console.log(`Creating Device: ${deviceId}`);

    await db.insert(cocktailDevices).values({
        id: deviceId,
        userId: user.id,
        vpsId: vpsId,
        name: 'Test VPS Agent',
        status: 'enrolling'
    });

    const tokenRaw = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(tokenRaw).digest('hex');

    await db.insert(cocktailEnrollmentTokens).values({
        tokenHash,
        deviceId: deviceId,
        expiresAt: addMinutes(new Date(), 30)
    });

    console.log('\n--- SETUP COMPLETE ---');
    console.log('You can now run the agent locally to test enrollment.');
    console.log('\nRun this command in a NEW terminal:\n');
    const cmd = `cd d:\\REGLOOK\\cocktail && npm run dev -- --serverUrl http://localhost:9100 --deviceId ${deviceId} --enrollmentToken ${tokenRaw}`;
    console.log(cmd);
    require('fs').writeFileSync('agent_cmd.txt', cmd);
    console.log('\n----------------------');

    await pool.end();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
