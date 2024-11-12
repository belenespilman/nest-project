import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'productos/entities/producto.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
    private fabricanteService: FabricantesService,
  ) {}

  async findAll(): Promise<Producto[]> {
    const productos = await this.productRepo.find({
      relations: ['fabricante'],
    });
    if (!productos.length) {
      throw new NotFoundException('No hay productos disponibles');
    }
    return productos;
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productRepo.findOne({
      where: { id },
      relations: ['fabricante'],
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
    return this.productRepo.save(producto);
  }

  async deleteProducto(id: number): Promise<void> {
    const producto = await this.productRepo.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    await this.productRepo.remove(producto);
  }
}
