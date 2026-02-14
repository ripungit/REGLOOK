import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { Logger } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { parse } from 'cookie';
import { COOKIE_NAMES } from '../../platform/security/cookies/cookie.constants';
import { DrizzleService } from '../../db/drizzle/drizzle.service';
import { sessions } from '../../db/drizzle/schema';
import { eq, and, gt, isNull } from 'drizzle-orm';

@WebSocketGateway({
    path: '/calendar/ws',
    transports: ['websocket'],
    cors: {
        origin: true,
        credentials: true,
    },
})
export class CalendarGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(CalendarGateway.name);
    private clients = new Map<string, Set<WebSocket>>(); // userId -> Set of WebSockets

    @WebSocketServer()
    server: Server;

    constructor(private readonly drizzle: DrizzleService) { }

    async handleConnection(client: WebSocket, request: IncomingMessage) {
        try {
            const cookieHeader = request.headers.cookie || '';
            const cookies = parse(cookieHeader);
            let userSessionId = cookies[COOKIE_NAMES.SESSION];

            const urlObj = new URL(request.url || '', 'http://localhost');
            if (!userSessionId) {
                userSessionId = urlObj.searchParams.get('sessionId') || undefined;
            }

            if (!userSessionId) {
                client.close(1008, 'Authentication required');
                return;
            }

            const [userSession] = await this.drizzle.db
                .select()
                .from(sessions)
                .where(
                    and(
                        eq(sessions.id, userSessionId),
                        isNull(sessions.revokedAt),
                        gt(sessions.expiresAt, new Date())
                    )
                );

            if (!userSession) {
                client.close(1008, 'Invalid session');
                return;
            }

            const userId = userSession.userId;
            if (!this.clients.has(userId)) {
                this.clients.set(userId, new Set());
            }
            this.clients.get(userId)!.add(client);

            (client as any).userId = userId;

            client.on('close', () => {
                this.clients.get(userId)?.delete(client);
            });

            this.logger.log(`User ${userId} connected to calendar WS`);

            client.send(JSON.stringify({ type: 'connected', userId }));

        } catch (error) {
            this.logger.error('WS Connection error', error);
            client.close(1011, 'Internal error');
        }
    }

    handleDisconnect(client: WebSocket) {
        const userId = (client as any).userId;
        if (userId && this.clients.has(userId)) {
            this.clients.get(userId)?.delete(client);
        }
    }

    notifyUser(userId: string, type: string, payload: any) {
        const userClients = this.clients.get(userId);
        if (userClients) {
            const message = JSON.stringify({ type, payload });
            userClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    }
}
