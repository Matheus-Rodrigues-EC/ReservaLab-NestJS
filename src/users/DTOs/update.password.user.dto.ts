import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
