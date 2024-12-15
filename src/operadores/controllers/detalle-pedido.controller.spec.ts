import { Test, TestingModule } from '@nestjs/testing';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedidoService } from 'operadores/services/detalle-pedido.service';
import { getModelToken } from '@nestjs/mongoose';

describe('DetallePedidoController', () => {
  let controller: DetallePedidoController;
  let service: DetallePedidoService;

  const mockDetallePedidoModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallePedidoController],
      providers: [
        DetallePedidoService,
        {
          provide: getModelToken('DetallePedido'),
          useValue: mockDetallePedidoModel,
        },
      ],
    }).compile();

    controller = module.get<DetallePedidoController>(DetallePedidoController);
    service = module.get<DetallePedidoService>(DetallePedidoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
