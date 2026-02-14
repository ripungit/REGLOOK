import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../../db/drizzle/drizzle.service';
import { users, User } from '@/db/drizzle/schema';
import { ErrorCodes } from '../../common/constants/error-codes';

@Injectable()
export class ManagementService {
    constructor(private readonly drizzle: DrizzleService) { }

    async getAllUsers(): Promise<User[]> {
        const db = this.drizzle.db;
        return db.select().from(users);
    }

    async setUserRole(userId: string, role: string): Promise<User> {
        const db = this.drizzle.db;

        const [updated] = await db
            .update(users)
            .set({ role, updatedAt: new Date() })
            .where(eq(users.id, userId))
            .returning();

        if (!updated) {
            throw new NotFoundException({
                code: ErrorCodes.USER_NOT_FOUND,
                message: 'User not found',
            });
        }

        return updated;
    }
}
