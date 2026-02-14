import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { SourcesService } from './sources.service';
import { PresignSourceDto } from './dto/presign-source.dto';
import { BearerAuthGuard } from 'src/platform/auth/guards/bearer-auth.guard';

@Controller('airnode/sources')
export class SourcesController {
  constructor(private sourcesService: SourcesService) {}

  @Post('presign')
  @UseGuards(BearerAuthGuard)
  async presignSource(@Req() req: Request, @Body() presignSourceDto: PresignSourceDto) {
    const userId = (req as any).user.id;
    return await this.sourcesService.presignSource(
      userId,
      presignSourceDto.projectId,
      presignSourceDto.sourceHash,
      presignSourceDto.sizeBytes,
      presignSourceDto.contentType
    );
  }
}