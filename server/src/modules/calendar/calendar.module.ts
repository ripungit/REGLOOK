import { Module, forwardRef } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarGateway } from './calendar.gateway';
import { DbModule } from '../../db/db.module';

@Module({
    imports: [DbModule],
    controllers: [CalendarController],
    providers: [CalendarService, CalendarGateway],
    exports: [CalendarService],
})
export class CalendarModule { }
