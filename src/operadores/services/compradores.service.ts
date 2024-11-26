import { Injectable, NotFoundException } from '@nestjs/common';
import { Comprador } from '../entities/comprador.entity';
import {
  CreateCompradorDTO,
  UpdateCompradorDTO,
} from '../dtos/compradores.dto';

@Injectable()
export class CompradoresService {
  private readonly compradorRepo: any = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];
  constructor() {}

  async findAll(): Promise<Comprador[]> {
    const compradores = await this.compradorRepo.find();
    if (!compradores.length) {
      throw new NotFoundException('No hay compradores disponibles');
    }
    return compradores;
  }

  async findOne(id: number): Promise<Comprador> {
    const comprador = await this.compradorRepo.findOne({ where: { id } });
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: ${id} no existe`);
    }
    return comprador;
  }

  async createComprador(payload: CreateCompradorDTO): Promise<Comprador> {
    const newComprador = this.compradorRepo.create(payload);
    return await this.compradorRepo.save(newComprador);
  }

  async updateComprador(
    id: number,
    payload: UpdateCompradorDTO,
  ): Promise<Comprador> {
    const comprador = await this.compradorRepo.findOne({ where: { id } });
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: ${id} no se encuentra`);
    }
    Object.assign(comprador, payload);
    return await this.compradorRepo.save(comprador);
  }

  async removeComprador(id: number): Promise<void> {
    const comprador = await this.compradorRepo.findOne({ where: { id } });
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: ${id} no se encuentra`);
    }
    await this.compradorRepo.remove(comprador);
  }
}
