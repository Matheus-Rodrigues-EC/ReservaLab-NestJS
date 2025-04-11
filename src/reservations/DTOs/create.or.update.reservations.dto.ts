/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDate, IsNumber, IsArray } from 'class-validator';

export class CreateOrUpdateReservationDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsNotEmpty()
  @IsArray()
  time: string[];

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsString()
  description: string;
}
