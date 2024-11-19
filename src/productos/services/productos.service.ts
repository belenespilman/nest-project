import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'productos/entities/producto.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { Fabricante } from 'productos/entities/fabricante.entity';
import { Categoria } from 'productos/entities/categoria.entity';
import { take } from 'rxjs';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productRepo: Repository<Producto>,
    @InjectRepository(Fabricante)
    private readonly fabricanteService: FabricantesService,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async findAll(params?: FilterProductDto): Promise<Producto[]> {
    if (params) {
      const { limit, offset } = params;
      const where: Record<string, any> = {};
      const { precioMinimo, precioMaximo } = params;
      if (precioMinimo && precioMaximo) {
        where.precio = Between(precioMinimo, precioMaximo);
      }
      return this.productRepo.find({
        relations: ['categorias'],
        where,
        take: limit,
        skip: offset,
      });
    }
    const productos = await this.productRepo.find({
      relations: ['categorias'],
    });
    if (!productos.length) {
      throw new NotFoundException('No hay productos disponibles');
    }
    return productos;
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productRepo.findOne({
      where: { id },
      relations: ['fabricante', 'categorias'],
    });
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    return producto;
  }

  async getProductsByIds(ids: number[]): Promise<Producto[]> {
    return await this.productRepo.find({
      where: {
        id: In(ids),
      },
    });
  }

  async createProduct(
    data: Omit<CreateProductDto, 'createdAt' | 'updatedAt'>,
  ): Promise<Producto> {
    const newProduct = this.productRepo.create(data);
    if (data.fabricanteId) {
      const fabricante = await this.fabricanteService.findOne(
        data.fabricanteId,
      );
      newProduct.fabricante = fabricante;
    }
    if (data.categoriasId) {
      const categoria = await this.categoriaRepo.find({
        where: { id: In(data.categoriasId) },
      });
      newProduct.categorias = categoria;
    }
    return await this.productRepo.save(newProduct);
  }

  async updateProduct(
    id: number,
    changes: UpdateProductDto,
  ): Promise<Producto> {
    const producto = await this.productRepo.findOne({ where: { id } });
    if (changes.fabricanteId) {
      const fabricante = await this.fabricanteService.findOne(
        changes.fabricanteId,
      );
      producto.fabricante = fabricante;
    }

    if (changes.categoriasId) {
      const categorias = await this.categoriaRepo.find({
        where: { id: In(changes.categoriasId) },
      });
      producto.categorias = categorias;
    }
    return this.productRepo.save(producto);
  }

  async deleteProducto(id: number): Promise<void> {
    const producto = await this.productRepo.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    await this.productRepo.remove(producto);
  }

  async addCategoryToProduct(productoId: number, categoriaId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: productoId },
      relations: ['categorias'],
    });
    const categoria = await this.categoriaRepo.findOne({
      where: { id: categoriaId },
    });
    producto.categorias.push(categoria);
    return this.productRepo.save(producto);
  }

  async removeCategoryFromProduct(productoId: number, categoriaId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: productoId },
      relations: ['categorias'],
    });
    producto.categorias = producto.categorias.filter(
      (item) => item.id !== categoriaId,
    );
    return this.productRepo.save(producto);
  }
}
