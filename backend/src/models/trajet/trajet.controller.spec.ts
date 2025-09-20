import { Test, TestingModule } from '@nestjs/testing';
import { TrajetController } from './trajet.controller';
import { TrajetService } from './trajet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trajet } from './entities/trajet.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email/email.service';
import { Inscription } from '../inscription/entities/inscription.entity';
import { InscriptionService } from '../inscription/inscription.service';
import { VoitureService } from '../voiture/voiture.service';
import { Voiture } from '../voiture/entities/voiture.entity';

describe('TrajetController', () => {
  let controller: TrajetController;
  let service: TrajetService;
  let inscriptionService: InscriptionService;
  let voitureService: VoitureService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrajetController],
      providers: [TrajetService, InscriptionService, VoitureService, EmailService,
        {
          provide: getRepositoryToken(Trajet),
          useClass: Repository,
        },

        {
          provide: getRepositoryToken(Inscription),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Voiture),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EmailService),
          useClass: EmailService,
        },


      ],
    }).compile();

    controller = module.get<TrajetController>(TrajetController);
    service = module.get<TrajetService>(TrajetService);
    inscriptionService = module.get<InscriptionService>(InscriptionService);
    voitureService = module.get<VoitureService>(VoitureService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
