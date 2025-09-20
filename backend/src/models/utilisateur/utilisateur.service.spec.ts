import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurService } from './utilisateur.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { Voiture } from '../voiture/entities/voiture.entity';

describe('UtilisateurService', () => {
  let service: UtilisateurService;
  let utilisateurRepository: Repository<Utilisateur>;
  let voitureRepository: Repository<Voiture>;

  // Mock implementation of UtilisateurRepository
  const mockUtilisateurRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

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
        UtilisateurService,
        {
          provide: getRepositoryToken(Utilisateur),
          useValue: mockUtilisateurRepository,
        },
        {
          provide: getRepositoryToken(Voiture),
          useValue: mockVoitureRepository,
        },
      ],
    }).compile();

    service = module.get<UtilisateurService>(UtilisateurService);
    utilisateurRepository = module.get<Repository<Utilisateur>>(getRepositoryToken(Utilisateur));
    voitureRepository = module.get<Repository<Voiture>>(getRepositoryToken(Voiture));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});