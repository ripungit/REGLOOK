import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { SessionGuard } from '../../platform/http/guards/session.guard';
import { CurrentUser } from '../../platform/http/decorators/current-user.decorator';

@ApiTags('Calendar')
@Controller('calendar/events')
@UseGuards(SessionGuard)
@ApiCookieAuth()
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Get()
    @ApiOperation({ summary: 'Get all calendar events for user' })
    @ApiResponse({ status: 200, description: 'List of events' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.calendarService.getEvents(userId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new calendar event' })
    @ApiResponse({ status: 201, description: 'Event created' })
    async create(
        @CurrentUser('id') userId: string,
        @Body() dto: any,
    ) {
        return this.calendarService.createEvent(userId, dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a calendar event' })
    @ApiResponse({ status: 200, description: 'Updated event' })
    async update(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
        @Body() dto: any,
    ) {
        return this.calendarService.updateEvent(userId, id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a calendar event' })
    @ApiResponse({ status: 200, description: 'Event deleted' })
    async delete(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
    ) {
        return this.calendarService.deleteEvent(userId, id);
    }
}
