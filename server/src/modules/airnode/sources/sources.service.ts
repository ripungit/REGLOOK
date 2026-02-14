import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import { projects } from 'src/db/drizzle/schema';
import { R2Service } from '../scheduler/r2.service';

@Injectable()
export class SourcesService {
  constructor(
    private drizzleService: DrizzleService,
    private r2Service: R2Service,
    private configService: ConfigService,
  ) { }

  async presignSource(
    userId: string,
    projectId: string,
    sourceHash: string,
    sizeBytes: number,
    contentType: string,
  ) {
    // Verify project exists and belongs to user
    const projectResult = await this.drizzleService.db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.ownerUserId, userId)
        )
      )
      .limit(1);

    if (projectResult.length === 0) {
      throw new Error('Project not found or does not belong to user');
    }

    // Build r2Key
    const r2Key = `sources/${projectId}/${sourceHash}.tar.gz`;

    // Generate presigned PUT url (expires 15m)
    const bucket = this.configService.get('R2_BUCKET') || 'airnode';
    const { url } = await this.r2Service.generatePresignedUrl(
      bucket,
      r2Key,
      900,
      'PUT',
      contentType
    ); // 15 minutes

    return {
      source: {
        r2Key,
        putUrl: url,
        expiresInSeconds: 900,
      },
    };
  }
}