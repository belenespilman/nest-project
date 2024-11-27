import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  Min,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  ValidateNested,
  isNotEmpty,
  isMongoId,
  IsMongoId,
} from 'class-validator';
import { CreateCategoryDTO } from './categorias.dto';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: string;

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
  @ValidateNested()
  readonly categoria: CreateCategoryDTO;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string;
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
