import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TrajetService } from '../../src/models/trajet/trajet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trajet } from '../../src/models/trajet/entities/trajet.entity';
import { Inscription } from '../../src/models/inscription/entities/inscription.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email/email.service';
import { Utilisateur } from 'src/models/utilisateur/entities/utilisateur.entity';
import e from 'express';

describe('AppModule (integration)', () => {
  let app: INestApplication;
  let trajetService: TrajetService;
  let emailService: EmailService;
  let trajetRepository: Repository<Trajet>;
  let inscriptionRepository: Repository<Inscription>;

  const mockTrajetRepository = {
    findOneBy: jest.fn(),
  };

  const mockInscriptionRepository = {
    find: jest.fn(),
  };

  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getRepositoryToken(Trajet),
          useValue: mockTrajetRepository,
        },
        {
          provide: getRepositoryToken(Inscription),
          useValue: mockInscriptionRepository,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    trajetService = moduleFixture.get<TrajetService>(TrajetService);
    emailService = moduleFixture.get<EmailService>(EmailService);
    trajetRepository = moduleFixture.get<Repository<Trajet>>(getRepositoryToken(Trajet));
    inscriptionRepository = moduleFixture.get<Repository<Inscription>>(getRepositoryToken(Inscription));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/utilisateur (GET)', () => {
    return request(app.getHttpServer())
      .get('/utilisateur')
      .expect(200);
  });

  it('/utilisateur/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/utilisateur/25')
      .expect(200);
  });



  it('/utilisateur (POST)', () => {
    return request(app.getHttpServer())
      .post('/utilisateur')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'conducteur',
        tel: '1234567890',
        ville: 'Paris',
      })
      .expect(201);
  });

  it('/utilisateur/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/utilisateur/15')
      .send({
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: 'gg',
        role: 'conducteur',
        tel: '0987654321',
        ville: 'Lyon'
      })
      .expect(200);
  });

  // // it('/utilisateur/:id (DELETE)', () => {
  // //   return request(app.getHttpServer())
  // //     .delete('/utilisateur/24')
  // //     .expect(200);
  // // });

  // //..........test inscription.......................................

  it('/inscription/listePassagersConducteur/:trajetId (GET)', () => {
    return request(app.getHttpServer())
      .get('/inscription/listePassagersConducteur/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/inscription/nouvelleInscription/:utilisateurId/:trajetId (POST)', () => {
    return request(app.getHttpServer())
      .post('/inscription/nouvelleInscription/4/2')
      .send()
      .expect(201)
  });

  // // it('/inscription/:id (DELETE)', () => {
  // //   return request(app.getHttpServer())
  // //     .delete('/inscription/4')
  // //     .expect(200)
  // //     .expect((res) => {
  // //       expect(res.body).toHaveProperty('id');
  // //       expect(res.body.id).toBe(1);
  // //     });
  // // });

  // //...............tests Marque............................

  it('/marque (POST)', () => {
    return request(app.getHttpServer())
      .post('/marque')
      .send({
        nom: 'Toyota',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nom', 'Toyota');
      });
  });

  it('/marque/:nom (POST)', () => {
    return request(app.getHttpServer())
      .post('/marque')
      .send(
        { nom: 'Toyota' }
      )
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nom', 'Toyota');
      });
  });

  it('/marque (GET)', () => {
    return request(app.getHttpServer())
      .get('/marque')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/marque/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/marque/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nom');
      });
  });

  it('/marque/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/marque/1')
      .send({
        nom: 'Honda',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nom', 'Honda');
      });
  });


  //..............tests trajet..............................

  it('/trajet/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/trajet/2')
      .expect(200);
  });
  it('/trajet (POST)', () => {
    return request(app.getHttpServer())
      .post('/trajet')
      .send({
        nplace: 3,
        kms: 500,
        dateT: '2025-02-17 12:00:00',
        utilisateurId: 6,
        villeDId: 3,
        villeAId: 2,
      })
      .expect(201);
  });

  it('/trajet/findTrajet/:villeD/:villeA/:dateT (GET)', () => {
    return request(app.getHttpServer())
      .get('/trajet/findTrajet/3/2/2025-02-15 00:00:00')
      .expect(200);
  });

  it('/trajet/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/trajet/14')
      .send({
        nplace: 4,
        kms: 600,
        dateT: '2025-02-18T12:00:00.000Z',
        // utilisateurId: 6,

      })
      .expect(200);
  });

    it('/trajet/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete('/trajet/1')
        .expect(200);
    });

  // it('/ville (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/ville')
  //     .send({
  //       nom: 'Paris',
  //       cp: '75000',
  //     })
  //     .expect(201);
  // });


  //   // ............tests ville.................

  it('/ville/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/ville/1')
      .expect(200);
  });

  // it('/ville/:id (PATCH)', () => {
  //   return request(app.getHttpServer())
  //     .patch('/ville/1')
  //     .send({
  //       nom: 'Lyon',
  //     })
  //     .expect(200);
  // });

  //   // it('/ville/:id (DELETE)', () => {
  //   //   return request(app.getHttpServer())
  //   //     .delete('/ville/6')
  //   //     .expect(200);
  //   // });


  //.................test voiture.............................

  it('/voiture (POST)', () => {
    return request(app.getHttpServer())
      .post('/voiture')
      .send({
        modele: 'Corolla',
        utilisateurId: 29, // Use a unique utilisateurId
        immatriculation: 'ABC-123dgdkkk',
        place: 3,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('modele', 'Corolla');
        expect(res.body).toHaveProperty('utilisateurId', 5);
        expect(res.body).toHaveProperty('immatriculation', 'ABC-123dgdkkk');
        expect(res.body).toHaveProperty('place', 5);
      });
  });

  it('/voiture (GET)', () => {
    return request(app.getHttpServer())
      .get('/voiture')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/voiture/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/voiture/2')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('modele');
        expect(res.body).toHaveProperty('immatriculation');
        expect(res.body).toHaveProperty('place');
      });
  });

  it('/voiture/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/voiture/15')
      .send({
        place: 4,
        modele: 'Civic',
        immatriculation: 'XYZ-789'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('place', 4);
        expect(res.body).toHaveProperty('modele', 'Civic');
        expect(res.body).toHaveProperty('immatriculation', 'XYZ-789');
      });
  });

  // it('/voiture/:id (DELETE)', () => {
  //   return request(app.getHttpServer())
  //     .delete('/voiture/1')
  //     .expect(200);
  // });




  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        nom: 'sama',
        prenom: 'old',
        email: 'sama.old@example.com',
        password: 'gg',
        role: 'conducteur',
        tel: '1234567890',
        ville: 'lyon',
        voiture: {
          place: 5,
          marque: 'Toyota',
          modele: 'Corolla',
          immatriculation: 'ABC-123',
        },
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('newUser');
        expect(res.body.newUser).toHaveProperty('id');
        expect(res.body.newUser).toHaveProperty('nom', 'sama');
        expect(res.body.newUser).toHaveProperty('prenom', 'old');
        expect(res.body.newUser).toHaveProperty('email', 'sama.old@example.com');
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'gg',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
      });
  });


  // describe('EmailService', () => {
  // it('should send an email', async () => {
  //   // const result = await emailService.sendEmail('sama.old@example.com', 'Test Subject', 'Test Body');
  //   // expect(result).toBeDefined();
  //   // expect(result.accepted).toContain('sama.old@example.com');
  // });

  it('doit envoyer des courriels à toutes les inscriptions d un trajet spécifique', async () => {
    const trajetId = 2;
    const inscriptions = [
      { utilisateur: { email: 'sama.old@example.com' } },
      { utilisateur: { email: 'sama2.old@example.com' } },
    ];

    mockInscriptionRepository.find.mockResolvedValue(inscriptions);

    await trajetService.notifyInscriptions(trajetId);

    expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(inscriptions.length);
    inscriptions.forEach((inscription) => {
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        inscription.utilisateur.email,
        'Notification du Conducteur',
        'Ceci est une notification du conducteur.'
      );
    });
  });
});
