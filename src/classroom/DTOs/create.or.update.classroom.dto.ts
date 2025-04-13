/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateOrUpdateClassroomDTO {
  @IsString()
  name: string;

  @IsInt()
  @Type(() => Number)
  capacity: number;

  @IsOptional()
  @IsString()
  description?: string;
}
