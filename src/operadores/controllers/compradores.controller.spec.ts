import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';
import { CompradoresService } from 'operadores/services/compradores.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CompradoresController', () => {
  let controller: CompradoresController;
  let service: CompradoresService;

  const mockCompradorModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradoresController],
      providers: [
        CompradoresService,
        {
          provide: getModelToken('Comprador'),
          useValue: mockCompradorModel,
        },
      ],
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
