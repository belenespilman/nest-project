import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesController } from './fabricantes.controller';
import { FabricantesService } from 'productos/services/fabricantes.service';

describe('FabricantesController', () => {
  let controller: FabricantesController;
  let service: FabricantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricantesController],
      providers: [FabricantesService],
    }).compile();

    controller = module.get<FabricantesController>(FabricantesController);
    service = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
