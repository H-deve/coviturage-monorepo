import { Test, TestingModule } from '@nestjs/testing';
import { VilleService } from './ville.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ville } from './entities/ville.entity';
import { Repository } from 'typeorm';

describe('VilleService', () => {
  let service: VilleService;
  let villeRepository: Repository<Ville>;

  // Mock implementation of VilleRepository
  const mockVilleRepository = {
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
        VilleService,
        {
          provide: getRepositoryToken(Ville),
          useValue: mockVilleRepository,
        },
      ],
    }).compile();

    service = module.get<VilleService>(VilleService);
    villeRepository = module.get<Repository<Ville>>(getRepositoryToken(Ville));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});