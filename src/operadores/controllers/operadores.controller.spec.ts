import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';

describe('OperadoresController', () => {
  let controller: OperadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresController],
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
