import { Test, TestingModule } from '@nestjs/testing';
import { DetallePedidoService } from './detalle-pedido.service';
import { getModelToken } from '@nestjs/mongoose';

describe('DetallePedidoService', () => {
  let service: DetallePedidoService;

  const mockDetallePedidoModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetallePedidoService,
        {
          provide: getModelToken('DetallePedido'),
          useValue: mockDetallePedidoModel,
        },
      ],
    }).compile();

    service = module.get<DetallePedidoService>(DetallePedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
