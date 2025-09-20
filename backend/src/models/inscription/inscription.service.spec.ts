import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionService } from './inscription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Repository } from 'typeorm';

describe('InscriptionService', () => {
  let service: InscriptionService;
  let inscriptionRepository: Repository<Inscription>;

  // Mock implementation of InscriptionRepository
  const mockInscriptionRepository = {
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
        InscriptionService,
        {
          provide: getRepositoryToken(Inscription),
          useValue: mockInscriptionRepository,
        },
      ],
    }).compile();

    service = module.get<InscriptionService>(InscriptionService);
    inscriptionRepository = module.get<Repository<Inscription>>(getRepositoryToken(Inscription));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});