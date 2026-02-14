import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { DrizzleService } from '../../db/drizzle/drizzle.service';
import { calendarEvents, CalendarEvent, NewCalendarEvent } from '../../db/drizzle/schema/calendar_events';
import { eq, and } from 'drizzle-orm';
import { CalendarGateway } from './calendar.gateway';

@Injectable()
export class CalendarService {
    constructor(
        private readonly drizzle: DrizzleService,
        @Inject(forwardRef(() => CalendarGateway))
        private readonly gateway: CalendarGateway,
    ) { }

    async getEvents(userId: string): Promise<CalendarEvent[]> {
        return this.drizzle.db
            .select()
            .from(calendarEvents)
            .where(eq(calendarEvents.userId, userId))
            .execute();
    }

    async createEvent(userId: string, data: Partial<NewCalendarEvent>): Promise<CalendarEvent> {
        const [event] = await this.drizzle.db
            .insert(calendarEvents)
            .values({
                ...data,
                userId,
                title: data.title || 'Untitled Event',
                startTime: data.startTime ? new Date(data.startTime) : new Date(),
                endTime: data.endTime ? new Date(data.endTime) : new Date(Date.now() + 3600000),
            } as NewCalendarEvent)
            .returning();

        this.gateway.notifyUser(userId, 'EVENT_CREATED', event);
        return event;
    }

    async updateEvent(userId: string, id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
        const updateData: any = {
            ...data,
            updatedAt: new Date(),
        };

        delete updateData.id;
        delete updateData.userId;
        delete updateData.createdAt;

        if (data.startTime) updateData.startTime = new Date(data.startTime);
        if (data.endTime) updateData.endTime = new Date(data.endTime);

        const [event] = await this.drizzle.db
            .update(calendarEvents)
            .set(updateData)
            .where(and(eq(calendarEvents.id, id), eq(calendarEvents.userId, userId)))
            .returning();

        if (!event) throw new NotFoundException('Event not found');

        this.gateway.notifyUser(userId, 'EVENT_UPDATED', event);
        return event;
    }

    async deleteEvent(userId: string, id: string): Promise<{ success: boolean }> {
        await this.drizzle.db
            .delete(calendarEvents)
            .where(and(eq(calendarEvents.id, id), eq(calendarEvents.userId, userId)))
            .execute();

        this.gateway.notifyUser(userId, 'EVENT_DELETED', { id });
        return { success: true };
    }
}
