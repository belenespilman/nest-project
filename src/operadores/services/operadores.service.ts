import { Injectable, NotFoundException } from '@nestjs/common';

import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';
import { ProductosService } from 'productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { CompradoresService } from './compradores.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private operadorModel: Model<Operador>,
    private productosService: ProductosService,
    private compradoresService: CompradoresService,
  ) {}

  async findAll(): Promise<Operador[]> {
    const operadores = await this.operadorModel.find().exec();
    if (!operadores) {
      throw new NotFoundException('No hay operadores disponibles');
    }
    return operadores;
  }

  async findOne(id: string): Promise<Operador> {
    const operador = await this.operadorModel.findById(id).exec();
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no existe`);
    }
    return operador;
  }

  async createOperador(payload: CreateOperadorDTO): Promise<Operador> {
    const newOperador = new this.operadorModel(payload);
    return newOperador.save();
  }

  async updateOperador(
    id: string,
    changes: UpdateOperadorDTO,
  ): Promise<Operador> {
    const operador = await this.operadorModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    return operador.save();
  }

  async deleteOperador(id: string): Promise<Object> {
    const operador = await this.operadorModel.findByIdAndDelete(id);
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    return {
      success: true,
      message: 'El operador fue eliminado correctamente',
    };
  }

  // async getOrderByUser(id: number): Promise<Pedido> {
  //   const operador = await this.operadorRepo.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   return {
  //     id,
  //     date: new Date(),
  //     operador,
  //     productos: await this.productosService.findAll(),
  //   };
  // }
}
