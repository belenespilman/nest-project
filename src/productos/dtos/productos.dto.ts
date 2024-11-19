import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  Min,
  IsNotEmpty,
  IsDate,
  IsArray,
  ValidateIf,
  IsOptional,
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

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly fabricanteId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  categoriasId: number[];
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['nombre']),
) {}

export class FilterProductDto {
  @ApiProperty()
  @IsPositive()
  limit: number;

  @ApiProperty()
  @Min(0)
  offset: number;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  precioMinimo?: number;

  @ApiProperty()
  @ValidateIf((item) => item.precioMinimo !== undefined)
  precioMaximo?: number;
}
