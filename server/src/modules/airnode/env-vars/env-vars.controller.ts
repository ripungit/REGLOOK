import { Controller, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { EnvVarsService } from './env-vars.service';
import { EnvVarDto } from './dto/env-var.dto';
import { BearerAuthGuard } from 'src/platform/auth/guards/bearer-auth.guard';

@Controller('airnode/environments')
export class EnvVarsController {
  constructor(private envVarsService: EnvVarsService) {}

  @Get(':envId/env')
  @UseGuards(BearerAuthGuard)
  async getEnvVars(@Req() req: Request, @Param('envId') envId: string) {
    const userId = (req as any).user.id;
    return await this.envVarsService.getEnvVars(envId, userId);
  }

  @Put(':envId/env')
  @UseGuards(BearerAuthGuard)
  async setEnvVar(
    @Req() req: Request, 
    @Param('envId') envId: string, 
    @Body() envVarDto: EnvVarDto
  ) {
    const userId = (req as any).user.id;
    await this.envVarsService.setEnvVar(
      envId, 
      userId, 
      envVarDto.key, 
      envVarDto.value, 
      envVarDto.isSecret ?? false
    );
    return { message: 'Environment variable set successfully' };
  }

  @Delete(':envId/env/:key')
  @UseGuards(BearerAuthGuard)
  async deleteEnvVar(
    @Req() req: Request,
    @Param('envId') envId: string,
    @Param('key') key: string
  ) {
    const userId = (req as any).user.id;
    await this.envVarsService.deleteEnvVar(envId, userId, key);
    return { message: 'Environment variable deleted successfully' };
  }
}