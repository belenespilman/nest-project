import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'productos/entities/producto.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class ProductosService {
  constructor(
    private fabricanteService: FabricantesService,
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params) {
      const filters: FilterQuery<Producto> = {};
      const { precioMinimo, precioMaximo } = params;
      const { limit, offset } = params;
      if (precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
      }
      return this.productModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().populate('fabricante').exec();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productModel.findById(id).exec();
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    return producto;
  }

  async createProduct(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async updateProduct(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with #id ${id} no encontrado`);
    }
    return product;
  }

  async deleteProducto(id: string): Promise<void> {
    const producto = await this.productModel.findById(id);

    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }

    await this.productModel.findByIdAndDelete(id);
  }

  // async addCategoryToProduct(productoId: number, categoriaId: number) {
  //   const producto = await this.productRepo.findOne({
  //     where: { id: productoId },
  //     relations: ['categorias'],
  //   });
  //   const categoria = await this.categoriaRepo.findOne({
  //     where: { id: categoriaId },
  //   });
  //   producto.categorias.push(categoria);
  //   return this.productRepo.save(producto);
  // }

  // async removeCategoryFromProduct(productoId: number, categoriaId: number) {
  //   const producto = await this.productRepo.findOne({
  //     where: { id: productoId },
  //     relations: ['categorias'],
  //   });
  //   producto.categorias = producto.categorias.filter(
  //     (item) => item.id !== categoriaId,
  //   );
  //   return this.productRepo.save(producto);
  // }
}
