import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresService } from './compradores.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CompradoresService', () => {
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
      providers: [
        CompradoresService,
        {
          provide: getModelToken('Comprador'),
          useValue: mockCompradorModel,
        },
      ],
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
