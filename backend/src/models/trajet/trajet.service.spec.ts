import { Test, TestingModule } from '@nestjs/testing';
import { TrajetService } from './trajet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trajet } from './entities/trajet.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email/email.service';
import { Inscription } from '../inscription/entities/inscription.entity';
import { Voiture } from '../voiture/entities/voiture.entity';

describe('TrajetService', () => {
  let service: TrajetService;
  let trajetRepository: Repository<Trajet>;
  let inscriptionRepository: Repository<Inscription>;
  let voitureRepository: Repository<Voiture>;
  let emailService: EmailService;

  const mockTrajetRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockInscriptionRepository = {
    find: jest.fn(),
  };

  const mockVoitureRepository = {
    find: jest
  }

  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrajetService,
        EmailService,
        {
          provide: getRepositoryToken(Trajet),
          useValue: mockTrajetRepository,
        },
        {
          provide: getRepositoryToken(Inscription),
          useValue: mockInscriptionRepository,

        },
        {
          provide: getRepositoryToken(Voiture),
          useValue: mockVoitureRepository,
        },
        {
          provide: getRepositoryToken(EmailService),
          useValue: mockEmailService,
        },
      ],
    }).compile();

    service = module.get<TrajetService>(TrajetService);
    trajetRepository = module.get<Repository<Trajet>>(getRepositoryToken(Trajet));
    inscriptionRepository = module.get<Repository<Inscription>>(getRepositoryToken(Inscription));
    voitureRepository = module.get<Repository<Voiture>>(getRepositoryToken(Voiture));
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});