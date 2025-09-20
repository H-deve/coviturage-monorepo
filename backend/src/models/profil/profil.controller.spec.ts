import { Test, TestingModule } from '@nestjs/testing';
import { ProfilController } from './profil.controller';
import { ProfilService } from './profil.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';
import { Repository } from 'typeorm';

describe('ProfilController', () => {
  let controller: ProfilController;
  let service: ProfilService;

  // Mock implementation of ProfilRepository
  const mockProfilRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilController],
      providers: [
        ProfilService,
        {
          provide: getRepositoryToken(Profil),
          useValue: mockProfilRepository,
        },
      ],
    }).compile();

    controller = module.get<ProfilController>(ProfilController);
    service = module.get<ProfilService>(ProfilService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here
});