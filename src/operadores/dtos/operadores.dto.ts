import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOperadorDTO {
  @ApiProperty({ description: 'Email del operador' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Password del operador' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Rol del operador' })
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}
