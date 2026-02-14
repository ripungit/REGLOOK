import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DrizzleService } from '../../db/drizzle/drizzle.service';
import { projects } from '@/db/drizzle/schema';
import { ErrorCodes } from '../../common/constants/error-codes';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface Project {
  id: string;
  ownerUserId: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProjectsService {
    constructor(private readonly drizzle: DrizzleService) { }

    async create(userId: string, dto: CreateProjectDto): Promise<Project> {
        const db = this.drizzle.db;

        // Generate slug from name if not provided in a separate field
        const slug = dto.name.toLowerCase().replace(/\s+/g, '-');

        const [project] = await db
            .insert(projects)
            .values({
                ownerUserId: userId,
                name: dto.name,
                slug: slug,
            })
            .returning();

        return project;
    }

    async findAllByUser(userId: string): Promise<Project[]> {
        const db = this.drizzle.db;
        return db
            .select()
            .from(projects)
            .where(eq(projects.ownerUserId, userId));
    }

    async findOne(userId: string, projectId: string): Promise<Project> {
        const db = this.drizzle.db;

        const [project] = await db
            .select()
            .from(projects)
            .where(eq(projects.id, projectId))
            .limit(1);

        if (!project) {
            throw new NotFoundException({
                code: ErrorCodes.PROJECT_NOT_FOUND,
                message: 'Project not found',
            });
        }

        // Check ownership
        if (project.ownerUserId !== userId) {
            throw new ForbiddenException({
                code: ErrorCodes.PROJECT_FORBIDDEN,
                message: 'You do not have access to this project',
            });
        }

        return project;
    }

    async update(userId: string, projectId: string, dto: UpdateProjectDto): Promise<Project> {
        const db = this.drizzle.db;

        // First verify ownership
        await this.findOne(userId, projectId);

        const [updated] = await db
            .update(projects)
            .set({
                name: dto.name,
                updatedAt: new Date(),
            })
            .where(and(eq(projects.id, projectId), eq(projects.ownerUserId, userId)))
            .returning();

        return updated;
    }

    async delete(userId: string, projectId: string): Promise<void> {
        const db = this.drizzle.db;

        // First verify ownership
        await this.findOne(userId, projectId);

        await db
            .delete(projects)
            .where(and(eq(projects.id, projectId), eq(projects.ownerUserId, userId)));
    }
}