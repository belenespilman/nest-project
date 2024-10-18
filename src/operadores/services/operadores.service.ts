import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OperadoresService {
  private idCont = 1;
  private operadores: Operador[] = [
    {
      id: 1,
      email: 'operador1@example.com',
      password: 'password123',
      role: 'admin',
    },
    {
      id: 2,
      email: 'operador2@example.com',
      password: 'password456',
      role: 'user',
    },
    {
      id: 3,
      email: 'operador3@example.com',
      password: 'password789',
      role: 'user',
    },
  ];

  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('APIKEY');
    const dbName = this.configService.get('DATABASE_NAME');
    const dbPort = this.configService.get('DATABASE_PORT');
    console.log(apiKey, dbName);
    const operadores = this.operadores;
    if (!operadores) {
      throw new NotFoundException('No se encuentran operadores');
    }
    return operadores;
  }

  findOne(id: number): Operador {
    const operador = this.operadores.find((op) => op.id === id);
    if (!operador) {
      throw new NotFoundException(`Operador con ID ${id} no encontrado`);
    }
    return operador;
  }

  createOperador(payload: Operador) {
    this.idCont = this.idCont + 1;
    const newOperador = {
      id: this.idCont,
      ...payload,
    };
    return this.operadores.push(newOperador);
  }

  updateOperador(id: number, payload: Partial<Operador>) {
    const index = this.operadores.findIndex((op) => op.id === id);
    if (index === -1) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    this.operadores[index] = {
      ...this.operadores[index],
      ...payload,
    };
    return this.operadores[index];
  }

  getOrderByUser(id: number): Pedido {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      productos: this.productsService.findAll(),
    };
  }

  deleteOperador(id: number) {
    const index = this.operadores.findIndex((op) => op.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    this.operadores.splice(index, 1);
    return true;
  }
}
