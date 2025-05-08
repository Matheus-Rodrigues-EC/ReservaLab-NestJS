import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateOrUpdateEquipmentsReservationDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  time: string[];

  @IsNotEmpty()
  @IsNumber()
  equipmentId: number;

  @IsString()
  description: string;
}
