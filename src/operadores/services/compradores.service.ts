import { Injectable, NotFoundException } from '@nestjs/common';
import { Comprador } from '../entities/comprador.entity';
import {
  CreateCompradorDTO,
  UpdateCompradorDTO,
} from '../dtos/compradores.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectModel(Comprador.name) private compradorModel: Model<Comprador>,
  ) {}

  async findAll(): Promise<Comprador[]> {
    return this.compradorModel.find().exec();
  }

  async findOne(id: string): Promise<Comprador> {
    const comprador = await this.compradorModel.findById(id).exec();
    if (!comprador) {
      throw new NotFoundException('comprador no encontrado');
    }
    return comprador;
  }

  async createComprador(data: CreateCompradorDTO): Promise<Comprador> {
    const newComprador = new this.compradorModel(data);
    return await newComprador.save();
  }

  async updateComprador(
    id: string,
    changes: UpdateCompradorDTO,
  ): Promise<Comprador> {
    const comprador = this.compradorModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!comprador) {
      throw new NotFoundException('Comprador no encontrado');
    }
    return comprador;
  }

  async removeComprador(id: string): Promise<void> {
    const comprador = this.compradorModel.findById(id).exec();
    if (!comprador) {
      throw new NotFoundException('Comprador no encontrado');
    }
    await this.compradorModel.findByIdAndDelete(id);
  }
}
