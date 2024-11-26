import { Injectable, NotFoundException } from '@nestjs/common';

import { Categoria } from '../entities/categoria.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categorias.dto';

@Injectable()
export class CategoriasService {
  private readonly categoriaRepo: any = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];
  constructor() {}

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepo.find({
      relations: ['productos'],
    });
    if (!categorias.length) {
      throw new NotFoundException('No hay categorías disponibles');
    }
    return categorias;
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!categoria) {
      throw new NotFoundException(`La categoría con id: ${id} no existe`);
    }
    return categoria;
  }

  async createCategoria(payload: CreateCategoryDTO): Promise<Categoria> {
    const newCategoria = this.categoriaRepo.create(payload);
    return await this.categoriaRepo.save(newCategoria);
  }

  async updateCategoria(
    id: number,
    payload: UpdateCategoryDTO,
  ): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`La categoría con id: ${id} no se encuentra`);
    }
    Object.assign(categoria, payload);
    return await this.categoriaRepo.save(categoria);
  }

  async deleteCategoria(id: number): Promise<void> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`La categoría con id: ${id} no se encuentra`);
    }
    await this.categoriaRepo.remove(categoria);
  }
}
