import { Test, TestingModule } from '@nestjs/testing';
import { ProfilService } from './profil.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';
import { Repository } from 'typeorm';

describe('ProfilService', () => {
  let service: ProfilService;
  let profilRepository: Repository<Profil>;


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
      providers: [ProfilService,
        {
          provide: getRepositoryToken(Profil),
          useValue: mockProfilRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilService>(ProfilService);
    profilRepository = module.get<Repository<Profil>>(getRepositoryToken(Profil));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
