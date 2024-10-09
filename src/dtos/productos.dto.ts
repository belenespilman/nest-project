import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  precio: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  origen: string;

  @IsUrl()
  @IsNotEmpty()
  imagen: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['nombre']),
) {}
