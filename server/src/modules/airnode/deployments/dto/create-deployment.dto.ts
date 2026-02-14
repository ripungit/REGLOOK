import { IsString, IsUUID, IsOptional, ValidateNested, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class SourceDto {
  @IsString()
  @IsNotEmpty()
  r2Key: string;

  @IsString()
  @IsNotEmpty()
  sourceHash: string;
}

export class CreateDeploymentDto {
  @IsUUID()
  projectId: string;

  @IsString()
  environmentName: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDto)
  @IsObject()
  source?: SourceDto;

  @IsOptional()
  @IsString()
  depsHash?: string;

  @IsOptional()
  @IsString()
  framework?: string;

  @IsOptional()
  @IsString()
  packageManager?: 'npm' | 'pnpm' | 'yarn';

  @IsOptional()
  @IsString()
  buildSpec?: string;

  @IsOptional()
  @IsString()
  healthcheck?: string;
}