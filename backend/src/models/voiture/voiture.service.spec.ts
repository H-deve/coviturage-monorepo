import { Test, TestingModule } from '@nestjs/testing';
import { VoitureService } from './voiture.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Voiture } from './entities/voiture.entity';
import { Repository } from 'typeorm';

describe('VoitureService', () => {
  let service: VoitureService;
  let voitureRepository: Repository<Voiture>;

  // Mock implementation of VoitureRepository
  const mockVoitureRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoitureService,
        {
          provide: getRepositoryToken(Voiture), 
          useValue: mockVoitureRepository,
        },
      ],
    }).compile();

    service = module.get<VoitureService>(VoitureService);
    voitureRepository = module.get<Repository<Voiture>>(getRepositoryToken(Voiture));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});