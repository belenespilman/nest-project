import { Injectable, NotFoundException } from '@nestjs/common';

import { Fabricante } from '../entities/fabricante.entity';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from '../dtos/fabricantes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectModel(Fabricante.name) private fabricanteModel: Model<Fabricante>,
  ) {}

  async findAll(): Promise<Fabricante[]> {
    const fabricantes = await this.fabricanteModel.find().exec();
    if (!fabricantes.length) {
      throw new NotFoundException('No hay fabricantes disponibles');
    }
    return fabricantes;
  }

  async findOne(id: number): Promise<Fabricante> {
    const fabricante = await this.fabricanteModel.findById(id).exec();
    if (!fabricante) {
      throw new NotFoundException(`El fabricante con id: ${id} no existe`);
    }
    return fabricante;
  }

  async createFabricante(payload: CreateFabricanteDTO): Promise<Fabricante> {
    const newFabricante = new this.fabricanteModel(payload);
    return await newFabricante.save();
  }

  async updateFabricante(
    id: number,
    payload: UpdateFabricanteDTO,
  ): Promise<Fabricante> {
    const fabricante = await this.fabricanteModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!fabricante) {
      throw new NotFoundException(
        `El fabricante con id: ${id} no se encuentra`,
      );
    }
    return fabricante;
  }

  async deleteFabricante(id: number): Promise<Object> {
    const fabricante = await this.fabricanteModel.findByIdAndDelete(id).exec();
    if (!fabricante) {
      throw new NotFoundException(
        `El fabricante con id: ${id} no se encuentra`,
      );
    }
    return {
      success: true,
      message: 'Fabricante eliminado correctamente',
    };
  }
}
