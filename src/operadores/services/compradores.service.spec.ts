import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresService } from './compradores.service';

describe('CompradoresService', () => {
  let service: CompradoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompradoresService],
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
