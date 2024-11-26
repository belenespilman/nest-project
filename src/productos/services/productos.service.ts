import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'productos/entities/producto.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductosService {
  private readonly productRepo: any = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];

  private readonly categoriaRepo: any = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];
  constructor(
    private fabricanteService: FabricantesService,
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productModel.findById(id).exec();
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    return producto;
  }

  // async getProductsByIds(ids: number[]): Promise<Producto[]> {
  //   return await this.productRepo.find({
  //     where: {
  //       id: In(ids),
  //     },
  //   });
  // }

  // async createProduct(
  //   data: Omit<CreateProductDto, 'createdAt' | 'updatedAt'>,
  // ): Promise<Producto> {
  //   const newProduct = this.productRepo.create(data);
  //   if (data.fabricanteId) {
  //     const fabricante = await this.fabricanteService.findOne(
  //       data.fabricanteId,
  //     );
  //     newProduct.fabricante = fabricante;
  //   }
  //   if (data.categoriasId) {
  //     const categoria = await this.categoriaRepo.find({
  //       where: { id: In(data.categoriasId) },
  //     });
  //     newProduct.categorias = categoria;
  //   }
  //   return await this.productRepo.save(newProduct);
  // }

  // async updateProduct(
  //   id: number,
  //   changes: UpdateProductDto,
  // ): Promise<Producto> {
  //   const producto = await this.productRepo.findOne({ where: { id } });
  //   if (changes.fabricanteId) {
  //     const fabricante = await this.fabricanteService.findOne(
  //       changes.fabricanteId,
  //     );
  //     producto.fabricante = fabricante;
  //   }

  //   if (changes.categoriasId) {
  //     const categorias = await this.categoriaRepo.find({
  //       where: { id: In(changes.categoriasId) },
  //     });
  //     producto.categorias = categorias;
  //   }
  //   return this.productRepo.save(producto);
  // }

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
