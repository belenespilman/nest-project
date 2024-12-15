import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from 'productos/controllers/productos.controller';
import { ProductosService } from 'productos/services/productos.service';
import { FabricantesService } from 'productos/services/fabricantes.service';
import { forwardRef } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from 'productos/entities/producto.entity';

describe('ProductosController', () => {
  let controller: ProductosController;
  let service: ProductosService;
  let fabricanteService: FabricantesService;

  const mockProductModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        ProductosService,
        FabricantesService,
        {
          provide: getModelToken('Producto'),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
    service = module.get<ProductosService>(ProductosService);
    fabricanteService = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
