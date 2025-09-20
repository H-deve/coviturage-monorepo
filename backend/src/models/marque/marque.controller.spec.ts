import { Test, TestingModule } from '@nestjs/testing';
import { MarqueController } from './marque.controller';
import { MarqueService } from './marque.service';

describe('MarqueController', () => {
  let controller: MarqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarqueController],
      providers: [MarqueService],
    }).compile();

    controller = module.get<MarqueController>(MarqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
