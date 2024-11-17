import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriasService } from 'productos/services/categorias.service';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'productos/dtos/categorias.dto';
import { Categoria } from 'productos/entities/categoria.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener listado de categorías' })
  async findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obtener categoría por ID' })
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear categoría' })
  async createCategoria(
    @Body() payload: CreateCategoryDTO,
  ): Promise<Categoria> {
    return this.categoriasService.createCategoria(payload);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Actualizar/Modificar categoría' })
  async updateCategoria(
    @Param('id') id: number,
    @Body() payload: UpdateCategoryDTO,
  ): Promise<Categoria> {
    return this.categoriasService.updateCategoria(id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Eliminar categoría' })
  async deleteCategoria(@Param('id') id: number): Promise<void> {
    return this.categoriasService.deleteCategoria(id);
  }
}
