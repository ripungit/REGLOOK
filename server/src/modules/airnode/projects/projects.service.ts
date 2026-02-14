import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import { projects, environments } from 'src/db/drizzle/schema';

@Injectable()
export class ProjectsService {
  constructor(private drizzleService: DrizzleService) {}

  async createProject(userId: string, name: string, slug?: string) {
    // Generate slug if not provided
    const projectSlug = slug || name.toLowerCase().replace(/\s+/g, '-');

    // Check if project with this slug already exists for this user
    const existingProject = await this.drizzleService.db
      .select()
      .from(projects)
      .where(
        eq(projects.slug, projectSlug)
      )
      .limit(1);

    if (existingProject.length > 0) {
      throw new Error(`Project with slug '${projectSlug}' already exists`);
    }

    // Create project
    const [newProject] = await this.drizzleService.db
      .insert(projects)
      .values({
        ownerUserId: userId,
        name,
        slug: projectSlug,
      })
      .returning();

    // Create default environments
    const defaultEnvironments = ['production', 'preview'];
    for (const envName of defaultEnvironments) {
      await this.drizzleService.db.insert(environments).values({
        projectId: newProject.id,
        name: envName,
      });
    }

    // Fetch the created project with environments
    const projectWithEnvs = await this.drizzleService.db
      .select({
        id: projects.id,
        name: projects.name,
        slug: projects.slug,
        ownerUserId: projects.ownerUserId,
        createdAt: projects.createdAt,
        environments: {
          id: environments.id,
          name: environments.name,
          createdAt: environments.createdAt,
        },
      })
      .from(projects)
      .leftJoin(environments, eq(environments.projectId, projects.id))
      .where(eq(projects.id, newProject.id));

    return {
      id: newProject.id,
      name: newProject.name,
      slug: newProject.slug,
      ownerUserId: newProject.ownerUserId,
      createdAt: newProject.createdAt,
      environments: projectWithEnvs
        .filter(p => p.environments)
        .map(env => env.environments),
    };
  }

  async findAllProjects(userId: string) {
    return await this.drizzleService.db
      .select()
      .from(projects)
      .where(eq(projects.ownerUserId, userId));
  }

  async findProjectById(projectId: string, userId: string) {
    const result = await this.drizzleService.db
      .select()
      .from(projects)
      .where(
        eq(projects.id, projectId)
      )
      .limit(1);

    if (result.length === 0) {
      throw new Error('Project not found');
    }

    const project = result[0];
    if (project.ownerUserId !== userId) {
      throw new Error('Unauthorized: Project does not belong to user');
    }

    return project;
  }
}