import {
    Controller,
    Get,
    Patch,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { ManagementService } from './management.service';
import { SessionGuard } from '../../platform/http/guards/session.guard';
import { RolesGuard } from '../../platform/http/guards/roles.guard';
import { CsrfGuard } from '../../platform/security/csrf/csrf.guard';
import { Roles } from '../../platform/http/decorators/roles.decorator';
import { SetRoleDto } from './dto/set-role.dto';

@ApiTags('Management')
@Controller('management')
@UseGuards(SessionGuard, RolesGuard)
@Roles('admin')
@ApiCookieAuth()
export class ManagementController {
    constructor(private readonly managementService: ManagementService) { }

    @Get('users')
    @ApiOperation({ summary: 'Get all users (admin only)' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    async getAllUsers() {
        const users = await this.managementService.getAllUsers();
        // Don't expose password hashes
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            role: u.role,
            marketingOptIn: u.marketingOptIn,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
        }));
    }

    @Patch('users/:id/role')
    @UseGuards(CsrfGuard)
    @ApiOperation({ summary: 'Set user role (admin only)' })
    @ApiResponse({ status: 200, description: 'Updated user' })
    async setRole(
        @Param('id') userId: string,
        @Body() dto: SetRoleDto,
    ) {
        const updated = await this.managementService.setUserRole(userId, dto.role);
        return {
            id: updated.id,
            email: updated.email,
            username: updated.username,
            firstName: updated.firstName,
            lastName: updated.lastName,
            role: updated.role,
            marketingOptIn: updated.marketingOptIn,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }
}
