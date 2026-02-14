import { IsString } from 'class-validator';

export class DeviceApproveDto {
  @IsString()
  userCode: string;

  @IsString()
  username: string;
}