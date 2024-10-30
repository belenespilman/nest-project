import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    const productos = await this.productRepo.find();
    if (!productos.length) {
      throw new NotFoundException('No hay productos disponibles');
    }
    return productos;
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productRepo.findOneBy({ id });
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

  async createProduct(payload: Producto): Promise<Producto> {
    const newProduct = this.productRepo.create(payload);
    return await this.productRepo.save(newProduct);
  }

  async updateProduct(
    id: number,
    payload: Partial<Producto>,
  ): Promise<Producto> {
    const producto = await this.productRepo.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    Object.assign(producto, payload);
    return await this.productRepo.save(producto);
  }

  async deleteProducto(id: number): Promise<void> {
    const producto = await this.productRepo.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    await this.productRepo.remove(producto);
  }
}
