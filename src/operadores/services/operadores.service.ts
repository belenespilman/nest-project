import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperadoresService {
  constructor(
    @InjectModel(Operador.name) private operadorModel: Model<Operador>,
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

  async createOperador(
    createOperadorDTO: CreateOperadorDTO,
  ): Promise<Omit<Operador, 'password'>> {
    const { email, password, role } = createOperadorDTO;
    const existingOperator = this.operadorModel.findOne({ email }).exec();
    if (existingOperator) {
      throw new BadRequestException('El operador ya existe');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOperador = new this.operadorModel({
      email,
      password: hashedPassword,
      role,
    });
    await newOperador.save();

    const operadorSinPassword = newOperador.toObject();
    delete operadorSinPassword.password;
    return operadorSinPassword;
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
