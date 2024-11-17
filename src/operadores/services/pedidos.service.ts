import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedidos.dto';
import { Comprador } from 'operadores/entities/comprador.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,

    @InjectRepository(Comprador)
    private readonly compradorRepo: Repository<Comprador>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepo.find({
      relations: ['operador', 'productos', 'detalles', 'detalles.producto'],
    });
    if (!pedidos.length) {
      throw new NotFoundException('No hay pedidos disponibles');
    }
    return pedidos;
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: ['operador', 'productos', 'detalles', 'detalles.producto'],
    });
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no existe`);
    }
    return pedido;
  }

  async createPedido(data: CreatePedidoDTO): Promise<Pedido> {
    const pedido = new Pedido();
    if (data.compradorId) {
      const customer = await this.compradorRepo.findOne({
        where: { id: data.compradorId },
      });
      pedido.comprador = customer;
    }
    return this.pedidoRepo.save(pedido);
  }

  async updatePedido(id: number, changes: UpdatePedidoDTO): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (changes.compradorId) {
      const customer = await this.compradorRepo.findOne({
        where: { id: changes.compradorId },
      });
      pedido.comprador = customer;
    }
    return this.pedidoRepo.save(pedido);
  }

  async deletePedido(id: number): Promise<void> {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`El pedido con id: ${id} no se encuentra`);
    }
    await this.pedidoRepo.remove(pedido);
  }
}
