import { Test, TestingModule } from '@nestjs/testing';
import { VilleController } from './ville.controller';
import { VilleService } from './ville.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ville } from './entities/ville.entity';
import { Repository } from 'typeorm';

describe('VilleController', () => {
  let controller: VilleController;
  let service: VilleService;

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
      controllers: [VilleController],
      providers: [
        VilleService,
        {
          provide: getRepositoryToken(Ville),
          useValue: mockVilleRepository,
        },
      ],
    }).compile();

    controller = module.get<VilleController>(VilleController);
    service = module.get<VilleService>(VilleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here
});