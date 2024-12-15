import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresService } from './operadores.service';
import { DatabaseModule } from 'database/database.module';
import { getModelToken } from '@nestjs/mongoose';
import { Operador } from 'operadores/entities/operador.entity';
import { ConfigModule } from '@nestjs/config';

describe('OperadoresService', () => {
  let service: OperadoresService;

  const mockOperadorModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperadoresService,
        {
          provide: getModelToken('Operador'),
          useValue: mockOperadorModel,
        },
      ],
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
