import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesService } from './fabricantes.service';

describe('FabricantesService', () => {
  let service: FabricantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricantesService],
    }).compile();

    service = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
