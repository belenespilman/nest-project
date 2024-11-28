import { Injectable, NotFoundException } from '@nestjs/common';

import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedidos.dto';
import { Comprador } from 'operadores/entities/comprador.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PedidosService {
  constructor(@InjectModel(Pedido.name) private pedidoModel: Model<Pedido>) {}

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoModel
      .find()
      .populate('comprador')
      .populate({
        path: 'productos',
        model: 'Producto',
      })
      .exec();
    if (!pedidos) {
      throw new NotFoundException('No hay pedidos disponibles');
    }
    return pedidos;
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no existe`);
    }
    return pedido;
  }

  async createPedido(data: CreatePedidoDTO): Promise<Pedido> {
    const newPedido = new this.pedidoModel(data);
    return await newPedido.save();
  }

  async updatePedido(id: string, changes: UpdatePedidoDTO): Promise<Pedido> {
    const pedido = await this.pedidoModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con #id ${id} no encontrado`);
    }
    return pedido;
  }

  async deletePedido(id: string): Promise<void> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) {
      throw new NotFoundException('Pedido con id no encontrado');
    }
    return this.pedidoModel.findByIdAndDelete();
  }
}
