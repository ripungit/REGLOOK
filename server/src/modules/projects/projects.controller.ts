import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { SessionGuard } from '../../platform/http/guards/session.guard';
import { CsrfGuard } from '../../platform/security/csrf/csrf.guard';
import { CurrentUser } from '../../platform/http/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(SessionGuard)
@ApiCookieAuth()
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    @UseGuards(CsrfGuard)
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'Project created' })
    async create(
        @CurrentUser('id') userId: string,
        @Body() dto: CreateProjectDto,
    ) {
        return this.projectsService.create(userId, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all projects for current user' })
    @ApiResponse({ status: 200, description: 'List of projects' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.projectsService.findAllByUser(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a project by ID' })
    @ApiResponse({ status: 200, description: 'Project details' })
    async findOne(
        @CurrentUser('id') userId: string,
        @Param('id') projectId: string,
    ) {
        return this.projectsService.findOne(userId, projectId);
    }

    @Patch(':id')
    @UseGuards(CsrfGuard)
    @ApiOperation({ summary: 'Update a project' })
    @ApiResponse({ status: 200, description: 'Updated project' })
    async update(
        @CurrentUser('id') userId: string,
        @Param('id') projectId: string,
        @Body() dto: UpdateProjectDto,
    ) {
        return this.projectsService.update(userId, projectId, dto);
    }

    @Delete(':id')
    @UseGuards(CsrfGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a project' })
    @ApiResponse({ status: 200, description: 'Project deleted' })
    async delete(
        @CurrentUser('id') userId: string,
        @Param('id') projectId: string,
    ) {
        await this.projectsService.delete(userId, projectId);
        return { ok: true };
    }
}
