import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesController } from './fabricantes.controller';

describe('FabricantesController', () => {
  let controller: FabricantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricantesController],
    }).compile();

    controller = module.get<FabricantesController>(FabricantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
