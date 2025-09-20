import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Voiture } from '../voiture/entities/voiture.entity';
import { Repository } from 'typeorm';

describe('UtilisateurController', () => {
  let controller: UtilisateurController;
  let service: UtilisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateurController],
      providers: [
        UtilisateurService,
        {
          provide: getRepositoryToken(Utilisateur),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Voiture),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UtilisateurController>(UtilisateurController);
    service = module.get<UtilisateurService>(UtilisateurService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here
});