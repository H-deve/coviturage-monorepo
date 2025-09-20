import { Injectable } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';

@Injectable()
export class InscriptionService {
  constructor(
    @InjectRepository(Inscription)
    private readonly inscriptionRepository: Repository<Inscription>,
  ) {}

  async create(createInscriptionDto: CreateInscriptionDto): Promise<Inscription> {
    const inscription = this.inscriptionRepository.create(createInscriptionDto);
    return await this.inscriptionRepository.save(inscription);
  }

  async findAll(): Promise<Inscription[]> {
    return await this.inscriptionRepository.find();
  }

  async findOne(id: number): Promise<Inscription> {
    const inscription = await this.inscriptionRepository.findOne({ where: { id } });
    if (!inscription) {
      throw new Error(`Inscription with id ${id} not found`);
    }
    return inscription;
  }

  async update(id: number, updateInscriptionDto: UpdateInscriptionDto): Promise<Inscription> {
    await this.inscriptionRepository.update(id, updateInscriptionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.inscriptionRepository.delete(id);
  }

  

  async findPassagersConducteur(trajetId: number): Promise<Utilisateur[]> {
    const inscriptions = await this.inscriptionRepository.find({
      where: { trajetId },
      relations: ['utilisateur'],
    });
    return inscriptions.map(inscription => inscription.utilisateur);
  }

  async createWithIds(idutilisateur:number , idTrajet : number): Promise<Inscription>{
    const inscription = this.inscriptionRepository.create({
      utilisateurId:idutilisateur, 
      trajetId:idTrajet,
      dateInscription: new Date(),
  
      });
    return await this.inscriptionRepository.save(inscription);
  }

}
