import { IsNotEmpty, IsString } from 'class-validator';

export class RecoverPasswordUserDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
}
