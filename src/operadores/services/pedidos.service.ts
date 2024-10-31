import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedidos.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepo.find({
      relations: ['operador', 'productos'],
    });
    if (!pedidos.length) {
      throw new NotFoundException('No hay pedidos disponibles');
    }
    return pedidos;
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['operador', 'productos'],
    });
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no existe`);
    }
    return pedido;
  }

  async createPedido(payload: CreatePedidoDTO): Promise<Pedido> {
    const newPedido = this.pedidoRepo.create(payload);
    return await this.pedidoRepo.save(newPedido);
  }

  async updatePedido(id: number, payload: UpdatePedidoDTO): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ id });
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no se encuentra`);
    }
    Object.assign(pedido, payload);
    return await this.pedidoRepo.save(pedido);
  }

  async deletePedido(id: number): Promise<void> {
    const pedido = await this.pedidoRepo.findOne({ id });
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no se encuentra`);
    }
    await this.pedidoRepo.remove(pedido);
  }
}
