import { Injectable, NotFoundException } from '@nestjs/common';

import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';
import { ProductosService } from 'productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { CompradoresService } from './compradores.service';

@Injectable()
export class OperadoresService {
  private readonly operadorRepo: any = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];
  constructor(
    private productosService: ProductosService,
    private compradoresService: CompradoresService,
  ) {}

  async findAll(): Promise<Operador[]> {
    const operadores = await this.operadorRepo.find({
      relations: ['comprador'],
    });
    if (!operadores.length) {
      throw new NotFoundException('No hay operadores disponibles');
    }
    return operadores;
  }

  async findOne(id: number): Promise<Operador> {
    const operador = await this.operadorRepo.findOne({
      where: { id },
      relations: ['comprador'],
    });
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no existe`);
    }
    return operador;
  }

  async createOperador(payload: CreateOperadorDTO): Promise<Operador> {
    const newOperador = this.operadorRepo.create(payload);
    if (payload.compradorId) {
      const comprador = await this.compradoresService.findOne(
        payload.compradorId,
      );
      newOperador.comprador = comprador;
    }
    return this.operadorRepo.save(newOperador);
  }

  async updateOperador(
    id: number,
    payload: UpdateOperadorDTO,
  ): Promise<Operador> {
    const operador = await this.operadorRepo.findOne({ where: { id } });
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    Object.assign(operador, payload);
    return await this.operadorRepo.save(operador);
  }

  async deleteOperador(id: number): Promise<void> {
    const operador = await this.operadorRepo.findOne({ where: { id } });
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    await this.operadorRepo.remove(operador);
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
