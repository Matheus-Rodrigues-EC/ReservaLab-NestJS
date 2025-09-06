/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsDate, IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  google_client_id: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  rulets: string;

  @IsNotEmpty()
  @IsString()
  shift: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @IsArray()
  Reservation: any[];
}
