import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateEquipmentsDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  tombNumber: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
