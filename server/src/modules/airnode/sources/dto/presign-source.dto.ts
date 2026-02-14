import { IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PresignSourceDto {
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  sourceHash: string;

  @IsNumber()
  @IsNotEmpty()
  sizeBytes: number;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}