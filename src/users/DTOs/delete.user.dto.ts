import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
