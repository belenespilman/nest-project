import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
  ];

  findAll() {
    return this.productos;
  }

  findOne(id: number) {
    return this.productos.find((product) => product.id === id);
  }

  createProduct(producto: any) {
    this.productos.push(producto);
    return producto;
  }

  updateProducto(id: number, productoActualizado: any) {
    const index = this.productos.findIndex((product) => product.id === id);
    if (index > -1) {
      this.productos[index] = {
        ...this.productos[index],
        ...productoActualizado,
      };
      return this.productos[index];
    }
    return null;
  }

  deleteProducto(id: number) {
    const index = this.productos.findIndex((product) => product.id === id);
    if (index > -1) {
      this.productos.splice(index, 1);
      return { delete: true, count: 1 };
    }
    return { delete: false, count: 0 };
  }
}
