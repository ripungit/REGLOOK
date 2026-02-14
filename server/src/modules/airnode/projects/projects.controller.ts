import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { BearerAuthGuard } from 'src/platform/auth/guards/bearer-auth.guard';

@Controller('airnode/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @UseGuards(BearerAuthGuard)
  async createProject(@Req() req: Request, @Body() createProjectDto: CreateProjectDto) {
    const userId = (req as any).user.id;
    return await this.projectsService.createProject(
      userId,
      createProjectDto.name,
      createProjectDto.slug
    );
  }

  @Get()
  @UseGuards(BearerAuthGuard)
  async getAllProjects(@Req() req: Request) {
    const userId = (req as any).user.id;
    return await this.projectsService.findAllProjects(userId);
  }

  @Get(':id')
  @UseGuards(BearerAuthGuard)
  async getProject(@Req() req: Request, @Param('id') id: string) {
    const userId = (req as any).user.id;
    return await this.projectsService.findProjectById(id, userId);
  }
}