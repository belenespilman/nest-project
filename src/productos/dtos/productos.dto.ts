import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  Min,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Origen del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['nombre']),
) {}
