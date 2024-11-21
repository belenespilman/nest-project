import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detallePedido.entity';
import { Producto } from 'productos/entities/producto.entity';
import {
  CreateDetallePedidoDTO,
  UpdateDetallePedidoDTO,
} from '../dtos/detallePedido.dto';
import { UpdatePedidoDTO } from '../dtos/pedidos.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private detalleRepo: Repository<DetallePedido>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async findAll() {
    return await this.detalleRepo.find({
      relations: ['pedido', 'prodcuto'],
    });
  }

  async findOne(id: number) {
    return await this.detalleRepo.findOne({
      where: { id },
      relations: ['pedido', 'producto'],
    });
  }

  async create(data: CreateDetallePedidoDTO) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: data.pedidoId },
    });
    const producto = await this.productoRepo.findOne({
      where: { id: data.productoId },
    });

    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.cantidad = data.cantidad;
    return this.detalleRepo.save(detalle);
  }

  async update(
    id: number,
    data: UpdateDetallePedidoDTO,
  ): Promise<DetallePedido> {
    const detalle = await this.detalleRepo.findOne({ where: { id } });
    if (!detalle) {
      throw new Error('Detalle de Pedido no encontrado');
    }
    detalle.cantidad = data.cantidad;
    if (data.pedidoId) {
      const pedido = await this.pedidoRepo.findOne({
        where: { id: data.pedidoId },
      });
      if (pedido) detalle.pedido = pedido;
    }
    if (data.productoId) {
      const producto = await this.productoRepo.findOne({
        where: { id: data.productoId },
      });
      if (producto) detalle.producto = producto;
    }
    return await this.detalleRepo.save(detalle);
  }

  async delete(id: number) {
    const detalle = await this.detalleRepo.findOne({ where: { id } });
    if (!detalle) {
      throw new Error('Detalle de Pedido no encontrado');
    }
    await this.detalleRepo.remove(detalle);
  }
}
