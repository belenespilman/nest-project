import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ProductosService {
  private idCont = 1;
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'loremipsum',
      precio: 25.99,
      stock: 50,
      origen: 'España',
      imagen: '',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: '',
      precio: 75.5,
      stock: 30,
      origen: 'Alemania',
      imagen: '',
    },
    {
      id: 3,
      nombre: 'Producto 3',
      descripcion: '',
      precio: 120.0,
      stock: 15,
      origen: 'Estados Unidos',
      imagen: '',
    },
    {
      id: 4,
      nombre: 'Producto 4',
      descripcion: '',
      precio: 40.75,
      stock: 70,
      origen: 'Italia',
      imagen: '',
    },
  ];

  findAll() {
    const productos = this.productos;
    if (!productos) {
      throw new NotFoundException('No hay productos disponibles');
    }
    return productos;
  }

  findOne(id: number) {
    const producto = this.productos.find((product) => product.id === id);
    if (!producto) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    return producto;
  }

  createProduct(payload: any) {
    this.idCont = this.idCont + 1;
    const newProduct = {
      id: this.idCont,
      ...payload,
    };
    return this.productos.push(newProduct);
  }

  updateProducto(id: number, payload: any) {
    const index = this.productos.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    this.productos[index] = {
      ...this.productos[index],
      ...payload,
    };
    return this.productos[index];
  }

  deleteProducto(id: number) {
    const index = this.productos.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    this.productos.splice(index, 1);
    return true;
  }
}
