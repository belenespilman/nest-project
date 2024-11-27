import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly imagen: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
