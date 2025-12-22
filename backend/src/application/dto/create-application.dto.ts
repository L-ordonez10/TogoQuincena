import { EstadoSolicitud } from '../entities/application.entity';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class PersonalDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsString()
  thirdName?: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  secondLastName?: string;

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

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  hasSixMonths?: boolean;
}

class UploadsDto {
  @IsOptional()
  dpi?: any;

  @IsOptional()
  bankStatements?: any;

  @IsOptional()
  electricityBill?: any;

  @IsOptional()
  selfieWithDpi?: any;
}

class ReferenceDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;
}

class LegalDto {
  @IsBoolean()
  acceptance: boolean;

  @IsBoolean()
  consent: boolean;
}

export class CreateApplicationDto {
  @ValidateNested()
  @Type(() => PersonalDto)
  personal: PersonalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UploadsDto)
  uploads?: UploadsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceDto)
  personalRefs?: ReferenceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceDto)
  workRefs?: ReferenceDto[];

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LegalDto)
  legal?: LegalDto;

  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estadoSolicitud?: EstadoSolicitud;
}
