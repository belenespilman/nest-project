import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { Producto } from 'productos/entities/producto.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { FabricantesService } from './fabricantes.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let fabricanteService: FabricantesService;

  const mockProductModel = {
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
        ProductosService,
        {
          provide: getModelToken('Producto'),
          useValue: mockProductModel,
        },
        FabricantesService,
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    fabricanteService = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
