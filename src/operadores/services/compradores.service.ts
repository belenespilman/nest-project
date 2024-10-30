import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import {
  CreateCompradorDTO,
  UpdateCompradorDTO,
} from '../dtos/compradores.dto';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private readonly compradorRepo: Repository<Comprador>,
  ) {}

  async findAll(): Promise<Comprador[]> {
    const compradores = await this.compradorRepo.find();
    if (!compradores.length) {
      throw new NotFoundException('No hay compradores disponibles');
    }
    return compradores;
  }

  async findOne(id: number): Promise<Comprador> {
    const comprador = await this.compradorRepo.findOneBy({ id });
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
    const comprador = await this.compradorRepo.findOneBy({ id });
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: ${id} no se encuentra`);
    }
    Object.assign(comprador, payload);
    return await this.compradorRepo.save(comprador);
  }

  async removeComprador(id: number): Promise<void> {
    const comprador = await this.compradorRepo.findOneBy({ id });
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: ${id} no se encuentra`);
    }
    await this.compradorRepo.remove(comprador);
  }
}
