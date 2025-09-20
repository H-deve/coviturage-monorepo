import { Injectable } from '@nestjs/common';
import { CreateTrajetDto } from './dto/create-trajet.dto';
import { UpdateTrajetDto } from './dto/update-trajet.dto';
import { In, Repository } from 'typeorm';
import { Trajet } from './entities/trajet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../../email/email/email.service';
import { Inscription } from '../inscription/entities/inscription.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';
import { Voiture } from '../voiture/entities/voiture.entity'; // Import Voiture entity

@Injectable()
export class TrajetService {

  constructor(
    @InjectRepository(Trajet)
    private readonly trajetRepository: Repository<Trajet>,
    @InjectRepository(Inscription)
    private readonly inscriptionRepository: Repository<Inscription>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Voiture) // Inject Voiture repository
    private readonly voitureRepository: Repository<Voiture>,
    private readonly emailService: EmailService,
  ) { }

  async create(createTrajetDto: CreateTrajetDto): Promise<Trajet> {
    const trajet = this.trajetRepository.create(createTrajetDto);
    return this.trajetRepository.save(trajet);
  }

  async findAll(): Promise<Trajet[]> {
    return this.trajetRepository.find();
  }

  async findOne(id: number): Promise<Trajet> {
    const trajet = await this.trajetRepository.findOneBy({ id });
    if (!trajet) {
      throw new Error(`Trajet with id ${id} not found`);
    }
    return trajet;
  }

  async update(id: number, updateTrajetDto: UpdateTrajetDto): Promise<Trajet> {
    try {
      await this.trajetRepository.update(id, updateTrajetDto);
      const trajet = await this.trajetRepository.findOneBy({ id });
      if (!trajet) {
        throw new Error(`Trajet with id ${id} not found`);
      }
      return trajet;
    } catch (error) {
      console.error(`Failed to update trajet with id ${id}:`, error);
      throw new Error(`Failed to update trajet with id ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    await this.trajetRepository.delete(id);
  }

  async findTrajet(villeD: number, villeA: number, dateT: Date): Promise<Trajet[]> {
    return this.trajetRepository.createQueryBuilder('trajet')
      .leftJoinAndSelect('trajet.villeD', 'villeD')
      .leftJoinAndSelect('trajet.villeA', 'villeA')
      .where('villeD.id = :villeD', { villeD })
      .andWhere('villeA.id = :villeA', { villeA })
      .andWhere('DATE(trajet.dateT) = DATE(:dateT)', { dateT: dateT.toISOString().split('T')[0] }) // Extracts only the date part
      .getMany();
  }

  async findAllTrajetsWithDetails(): Promise<any[]> {
    const trajets = await this.trajetRepository.createQueryBuilder('trajet')
      .leftJoinAndSelect('trajet.villeD', 'villeD')
      .leftJoinAndSelect('trajet.villeA', 'villeA')
      .leftJoinAndSelect('trajet.inscriptions', 'inscriptions')
      .leftJoinAndSelect('inscriptions.utilisateur', 'utilisateur')
      .leftJoinAndSelect('utilisateur.voiture', 'voiture')
      .leftJoinAndSelect('voiture.marque', 'marque')
      .getMany();

    return trajets.map(trajet => ({
      ...trajet,
      inscriptions: trajet.inscriptions.map(inscription => ({
        ...inscription,
        utilisateur: {
          ...inscription.utilisateur,
          voiture: inscription.utilisateur.voiture
            ? { ...inscription.utilisateur.voiture, marque: inscription.utilisateur.voiture.marque }
            : null,
        },
      })),
    }));
  }

  async findTrajetWithDetails(villeD: number, villeA: number, dateT: Date): Promise<any[]> {
    const trajets = await this.trajetRepository.createQueryBuilder('trajet')
      .leftJoinAndSelect('trajet.villeD', 'villeD')
      .leftJoinAndSelect('trajet.villeA', 'villeA')
      .leftJoinAndSelect('trajet.inscriptions', 'inscriptions')
      .leftJoinAndSelect('inscriptions.utilisateur', 'utilisateur')
      .leftJoinAndSelect('utilisateur.voiture', 'voiture')
      .leftJoinAndSelect('voiture.marque', 'marque')
      .where('trajet.villeD.id = :villeD', { villeD })
      .andWhere('trajet.villeA.id = :villeA', { villeA })
      .andWhere('DATE(trajet.dateT) = :dateT', { dateT: dateT.toISOString().split('T')[0] })
      .getMany();

    return trajets.map(trajet => ({
      ...trajet,
      inscriptions: trajet.inscriptions.map(inscription => ({
        ...inscription,
        utilisateur: {
          ...inscription.utilisateur,
          voiture: inscription.utilisateur.voiture
            ? { ...inscription.utilisateur.voiture, marque: inscription.utilisateur.voiture.marque }
            : null,
        },
      })),
    }));
  }

  async notifyInscriptions(trajetId: number) {
    const inscriptions = await this.getInscriptionsForTrajet(trajetId);

    for (const inscription of inscriptions) {
      if (inscription.utilisateur && inscription.utilisateur.email) {
        await this.emailService.sendEmail(
          inscription.utilisateur.email,
          'Notification du Conducteur',
          'This is a notification from the conducteur.'
        );
      }
    }
  }

  async notifyConducteur(inscriptionId: number) {
    const conducteur = await this.getConducteurForInscription(inscriptionId);

    await this.emailService.sendEmail(
      conducteur.email,
      'Notification du Inscription',
      'This is a notification from an inscription.'
    );
  }

  async getInscriptionsForTrajet(trajetId: number): Promise<Inscription[]> {
    return this.inscriptionRepository.find({
      where: { trajetId: trajetId },
      relations: ['utilisateur'],
    });
  }

  private async getConducteurForInscription(inscriptionId: number) {
    // Replace with actual logic to fetch conducteur
    return { email: 'conducteur@example.com' };
  }
}