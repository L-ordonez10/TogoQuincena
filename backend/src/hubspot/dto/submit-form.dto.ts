import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class SubmitFormDto {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  surnames: string;

  @IsOptional()
  @IsString()
  marriedLastName?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dpi?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  workName: string;

  @IsOptional()
  @IsString()
  addressWork?: string;

  @IsOptional()
  @IsString()
  phoneWork?: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number | string;

  @IsNumber()
  @IsNotEmpty()
  amountRequested: number | string;
}
