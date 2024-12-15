import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from 'operadores/services/pedidos.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('PedidosController', () => {
  let controller: PedidosController;
  let service: PedidosService;

  const mockPedidoModel = {
    find: jest
      .fn()
      .mockReturnValue([
        { _id: '1', productos: ['producto1'], operador: 'operador1' },
      ]),
    findOne: jest
      .fn()
      .mockReturnValue({
        _id: '1',
        productos: ['producto1'],
        operador: 'operador1',
      }),
    create: jest
      .fn()
      .mockReturnValue({
        _id: '2',
        productos: ['producto2'],
        operador: 'operador2',
      }),
    update: jest
      .fn()
      .mockReturnValue({
        _id: '1',
        productos: ['producto1', 'producto2'],
        operador: 'operador2',
      }),
    remove: jest.fn().mockReturnValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        PedidosService,
        {
          provide: getModelToken('Pedidos'),
          useValue: mockPedidoModel,
        },
      ],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
