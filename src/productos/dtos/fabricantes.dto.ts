import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  isURL,
  IsPositive,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateFabricanteDTO {
  @ApiProperty({ description: 'ID del fabricante' })
  readonly id: number;

  @ApiProperty({ description: 'Nombre del fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Dirección del fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @ApiProperty({ description: 'Email del fabricante' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Imagen' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(
  OmitType(CreateFabricanteDTO, ['nombre']),
) {}
