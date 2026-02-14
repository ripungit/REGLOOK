import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DrizzleService } from './src/db/drizzle/drizzle.service';
import { TokenService } from './src/platform/auth/services/token.service';
import { eq } from 'drizzle-orm';
import { nodes, nodeHeartbeats } from './src/db/drizzle/schema';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const drizzleService = app.get(DrizzleService);
    const tokenService = app.get(TokenService);

    const agentName = 'airnode1';
    const agentKey = 'super-secret-key-from-master-db';
    const agentKeyHash = await tokenService.hashToken(agentKey);
    console.log('Registering/Updating node:', agentName);

    // Try to find existing node first
    const existingNodes = await drizzleService.db.select().from(nodes).where(eq(nodes.name, agentName)).limit(1);

    let nodeId: string;

    if (existingNodes.length > 0) {
        console.log('Node already exists, updating...');
        nodeId = existingNodes[0].id;
        await drizzleService.db.update(nodes).set({
            baseDomain: 'airnode1.reglook.com',
            agentKeyHash,
            capabilities: { docker: true, traefik: true },
            buildSlotsTotal: 1,
            runtimeSlotsTotal: 50,
            status: 'active',
        }).where(eq(nodes.id, nodeId));
    } else {
        const [newNode] = await drizzleService.db.insert(nodes).values({
            name: agentName,
            baseDomain: 'airnode1.reglook.com',
            agentKeyHash,
            capabilities: { docker: true, traefik: true },
            buildSlotsTotal: 1,
            runtimeSlotsTotal: 50,
            status: 'active',
        }).returning();
        nodeId = newNode.id;
    }

    console.log('Node registered/updated:', nodeId);

    console.log('Inserting initial heartbeat...');
    await drizzleService.db.insert(nodeHeartbeats).values({
        nodeId: nodeId,
        cpuPercent: 10,
        ramUsedMb: 1024,
        ramTotalMb: 8192,
        diskFreeGb: 100,
        buildSlotsUsed: 0,
        runtimeSlotsUsed: 0,
    });

    console.log('Local node setup complete!');

    await app.close();
}

bootstrap();
