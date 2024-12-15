import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';
import { OperadoresService } from 'operadores/services/operadores.service';
import { getModelToken } from '@nestjs/mongoose';

describe('OperadoresController', () => {
  let controller: OperadoresController;
  let service: OperadoresService;

  const mockOperadoresModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresController],
      providers: [
        OperadoresService,
        {
          provide: getModelToken('Operadores'),
          useValue: mockOperadoresModel,
        },
      ],
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
