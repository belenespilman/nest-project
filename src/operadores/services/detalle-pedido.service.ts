import { Injectable, NotFoundException } from '@nestjs/common';
import { DetallePedido } from '../entities/detallePedido.entity';
import {
  CreateDetallePedidoDTO,
  UpdateDetallePedidoDTO,
} from '../dtos/detallePedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectModel(DetallePedido.name)
    private DetallePedidoModel: Model<DetallePedido>,
  ) {}

  async findAll() {
    const detallePedidos = await this.DetallePedidoModel.find().exec();
    if (!detallePedidos) {
      throw new NotFoundException('No hay detalles de pedidos disponibles');
    }
    return detallePedidos;
  }

  async findOne(id: string) {
    const detallePedido = await this.DetallePedidoModel.findById(id).exec();
    if (!detallePedido) {
      throw new NotFoundException(
        `Detalle del pedido con id #${id} no encontrado`,
      );
    }
    return detallePedido;
  }

  async create(data: CreateDetallePedidoDTO) {
    const newDetallePedido = new this.DetallePedidoModel(data);
    return newDetallePedido.save();
  }

  async update(
    id: string,
    changes: UpdateDetallePedidoDTO,
  ): Promise<DetallePedido> {
    const detallePedido = await this.DetallePedidoModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    ).exec();
    if (!detallePedido) {
      throw new NotFoundException(
        `Detalle del pedido con id #${id} no encontrado`,
      );
    }
    return detallePedido.save();
  }

  async delete(id: string) {
    const detalle = await this.DetallePedidoModel.findByIdAndDelete(id);
    if (!detalle) {
      throw new NotFoundException(
        `Detalle del pedido con id #${id} no encontrado`,
      );
    }
    return {
      success: true,
      message: 'El detalle ha sido eliminado',
    };
  }
}
