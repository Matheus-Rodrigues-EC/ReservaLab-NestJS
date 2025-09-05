/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  rulets: string;

  @IsOptional()
  @IsString()
  google_client_id?: string;
}
