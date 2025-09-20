import { Test, TestingModule } from '@nestjs/testing';
import { MarqueService } from './marque.service';

describe('MarqueService', () => {
  let service: MarqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarqueService],
    }).compile();

    service = module.get<MarqueService>(MarqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
