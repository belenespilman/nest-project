import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';

describe('CompradoresController', () => {
  let controller: CompradoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradoresController],
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
