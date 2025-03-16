import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  cuit: string;

  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsDateString()
  fechaAdhesion: string;
}
