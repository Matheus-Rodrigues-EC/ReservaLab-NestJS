/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrUpdateClassesDTO {
  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsString()
  shift: string;

  @IsString()
  description: string;
}
