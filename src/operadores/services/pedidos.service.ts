import { Injectable, NotFoundException } from '@nestjs/common';
import { OperadoresService } from './operadores.service';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = [];

  constructor(
    private readonly operadoresService: OperadoresService,
    private readonly productoService: ProductosService,
  ) {}

  findAll() {
    const pedidos = this.pedidos;
    if (!pedidos) {
      throw new NotFoundException('No se encuentran pedidos');
    }
    return pedidos;
  }

  findOne(id: number) {
    const pedido = this.pedidos.find((id) => pedido.id === id);
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return pedido;
  }

  createPedido(operadorId: number, productoIds: number[]): Pedido {
    const operador = this.operadoresService.findOne(operadorId);
    const productos = this.productoService.getProductsByIds(productoIds);

    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error('No products found for the provided IDs');
    }

    const nuevoPedido: Pedido = {
      id: this.pedidos.length + 1,
      date: new Date(),
      operador: operador,
      productos: productos,
    };

    this.pedidos.push(nuevoPedido);
    return nuevoPedido;
  }

  updatePedido() {}

  deletePedido() {}
}
