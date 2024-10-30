import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectRepository(Operador)
    private readonly operadorRepo: Repository<Operador>,
  ) {}

  async findAll(): Promise<Operador[]> {
    const operadores = await this.operadorRepo.find();
    if (!operadores.length) {
      throw new NotFoundException('No hay operadores disponibles');
    }
    return operadores;
  }

  async findOne(id: number): Promise<Operador> {
    const operador = await this.operadorRepo.findOne({ where: { id } });
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no existe`);
    }
    return operador;
  }

  async createOperador(payload: CreateOperadorDTO): Promise<Operador> {
    const newOperador = this.operadorRepo.create(payload);
    return await this.operadorRepo.save(newOperador);
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

  async removeOperador(id: number): Promise<void> {
    const operador = await this.operadorRepo.findOne({ where: { id } });
    if (!operador) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    await this.operadorRepo.remove(operador); // Elimina el operador de la base de datos
  }
}
