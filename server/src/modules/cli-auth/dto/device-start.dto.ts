import { IsString } from 'class-validator';

export class DeviceStartDto {
  @IsString()
  deviceCode: string;
}