import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fabricante } from '../entities/fabricante.entity';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from '../dtos/fabricantes.dto';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante)
    private readonly fabricanteRepo: Repository<Fabricante>,
  ) {}

  async findAll(): Promise<Fabricante[]> {
    const fabricantes = await this.fabricanteRepo.find({
      relations: ['products'],
    });
    if (!fabricantes.length) {
      throw new NotFoundException('No hay fabricantes disponibles');
    }
    return fabricantes;
  }

  async findOne(id: number): Promise<Fabricante> {
    const fabricante = await this.fabricanteRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!fabricante) {
      throw new NotFoundException(`El fabricante con id: ${id} no existe`);
    }
    return fabricante;
  }

  async createFabricante(payload: CreateFabricanteDTO): Promise<Fabricante> {
    const newFabricante = this.fabricanteRepo.create(payload);
    return await this.fabricanteRepo.save(newFabricante);
  }

  async updateFabricante(
    id: number,
    payload: UpdateFabricanteDTO,
  ): Promise<Fabricante> {
    const fabricante = await this.fabricanteRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!fabricante) {
      throw new NotFoundException(
        `El fabricante con id: ${id} no se encuentra`,
      );
    }
    Object.assign(fabricante, payload);
    return await this.fabricanteRepo.save(fabricante);
  }

  async deleteFabricante(id: number): Promise<void> {
    const fabricante = await this.fabricanteRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!fabricante) {
      throw new NotFoundException(
        `El fabricante con id: ${id} no se encuentra`,
      );
    }
    await this.fabricanteRepo.remove(fabricante);
  }
}
