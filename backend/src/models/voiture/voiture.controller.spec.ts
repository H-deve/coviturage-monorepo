import { Test, TestingModule } from '@nestjs/testing';
import { VoitureController } from './voiture.controller';
import { VoitureService } from './voiture.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Voiture } from './entities/voiture.entity';
import { Repository } from 'typeorm';

describe('VoitureController', () => {
  let controller: VoitureController;
  let service: VoitureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoitureController],
      providers: [
        VoitureService,
        {
          provide: getRepositoryToken(Voiture),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<VoitureController>(VoitureController);
    service = module.get<VoitureService>(VoitureService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});