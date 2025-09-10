import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  google_client_id?: string;
}
