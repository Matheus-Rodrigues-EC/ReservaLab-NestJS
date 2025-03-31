import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrUpdateClassesDTO {
  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsNumber()
  className: string;

  @IsNotEmpty()
  @IsString()
  shift: string;

  @IsString()
  description: string;
}
