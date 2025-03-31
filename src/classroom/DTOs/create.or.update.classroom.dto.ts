import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrUpdateClassroomDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsString()
  description: string;
}
