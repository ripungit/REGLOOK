import { IsString } from 'class-validator';

export class DevicePollDto {
  @IsString()
  deviceCode: string;
}