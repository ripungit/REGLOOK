import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class EnvVarDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsBoolean()
  isSecret?: boolean;
}