import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetRoleDto {
    @ApiProperty({ example: 'admin', enum: ['user', 'admin'] })
    @IsString()
    @IsIn(['user', 'admin'])
    role: string;
}
