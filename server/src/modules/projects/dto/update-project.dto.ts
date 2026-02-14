import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
    @ApiProperty({ example: 'Updated Project Name' })
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name: string;
}
