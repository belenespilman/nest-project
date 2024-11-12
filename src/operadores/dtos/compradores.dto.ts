import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

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
}

export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre']),
) {}
