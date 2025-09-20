import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Repository } from 'typeorm';

describe('InscriptionController', () => {
  let controller: InscriptionController;
  let service: InscriptionService;

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
      controllers: [InscriptionController],
      providers: [
        InscriptionService,
        {
          provide: getRepositoryToken(Inscription),
          useValue: mockInscriptionRepository,
        },
      ],
    }).compile();

    controller = module.get<InscriptionController>(InscriptionController);
    service = module.get<InscriptionService>(InscriptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here
});