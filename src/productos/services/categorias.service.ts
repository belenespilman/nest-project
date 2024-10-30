import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepo.find();
    if (!categorias.length) {
      throw new NotFoundException('No hay categorías disponibles');
    }
    return categorias;
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOneBy({ id });
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
    const categoria = await this.categoriaRepo.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`La categoría con id: ${id} no se encuentra`);
    }
    Object.assign(categoria, payload);
    return await this.categoriaRepo.save(categoria);
  }

  async deleteCategoria(id: number): Promise<void> {
    const categoria = await this.categoriaRepo.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`La categoría con id: ${id} no se encuentra`);
    }
    await this.categoriaRepo.remove(categoria);
  }
}
