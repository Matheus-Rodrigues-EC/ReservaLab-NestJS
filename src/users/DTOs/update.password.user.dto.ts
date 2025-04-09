import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDTO {
  @IsNotEmpty()
  @IsString()
  CurrentPassword: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @IsNotEmpty()
  @IsString()
  ConfirmNewPassword: string;
}
