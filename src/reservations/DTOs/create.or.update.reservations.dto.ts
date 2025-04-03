import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

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
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsString()
  description: string;
}
