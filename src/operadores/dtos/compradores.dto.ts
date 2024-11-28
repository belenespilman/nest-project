import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateDireccionesDTO } from './direcciones.dto';
import { Type } from 'class-transformer';

export class CreateCompradorDTO {
  @ApiProperty({ description: 'ID del comprador' })
  readonly id: number;

  @ApiProperty({ description: 'Nombre del comprador' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Apellido del comprador' })
  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @ApiProperty({ description: 'Teléfono del comprador' })
  @IsNumber()
  @IsNotEmpty()
  readonly telefono: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CreateDireccionesDTO)
  readonly direcciones: CreateDireccionesDTO[];
}

export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre']),
) {}
