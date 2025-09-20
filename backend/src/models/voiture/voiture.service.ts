import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { Voiture } from './entities/voiture.entity';
import { Marque } from '../marque/entities/marque.entity';

@Injectable()
export class VoitureService {
  constructor(
    @InjectRepository(Voiture)
    private readonly voitureRepository: Repository<Voiture>,
    @InjectRepository(Marque)
    private readonly marqueRepository: Repository<Marque>,
  ) {}

  async create(createVoitureDto: CreateVoitureDto): Promise<Voiture> {
    const voiture = this.voitureRepository.create(createVoitureDto);
    return await this.voitureRepository.save(voiture);
  }

  async save(voiture: Voiture): Promise<Voiture> {
    return this.voitureRepository.save(voiture);
  }

  async findAll(): Promise<Voiture[]> {
    return await this.voitureRepository.find();
  }

  async findOne(id: number): Promise<Voiture> {
    const voiture = await this.voitureRepository.findOne({ where: { id }, 
      relations: ['marque']
    });
    if (!voiture) {
      throw new Error(`Voiture with id ${id} not found`);
    }
    return voiture;
  }

  async findByUtilisateurId(utilisateurId: number): Promise<Voiture[]> {
    const voitures = await this.voitureRepository.find({ where: { utilisateurId } });
    if (!voitures.length) {
      throw new Error(`No voitures found with utilisateurId ${utilisateurId}`);
    }
    return voitures;
  }

  async update(id: number, updateVoitureDto: UpdateVoitureDto): Promise<Voiture> {
    await this.voitureRepository.update(id, updateVoitureDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.voitureRepository.delete(id);
  }
}