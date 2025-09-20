import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { Profil } from './entities/profil.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';

@Injectable()
export class ProfilService {

  constructor(
    @InjectRepository(Profil)
    private readonly profilRepository: Repository<Profil>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) { }

  async create(createProfilDto: CreateProfilDto): Promise<Profil> {
    const profil = this.profilRepository.create(createProfilDto);
    return await this.profilRepository.save(profil);
  }

  async findAll(): Promise<Profil[]> {
    return await this.profilRepository.find();
  }

  async findOne(id: number): Promise<Profil> {
    const profil = await this.profilRepository.findOne({ where: { id } });
    if (!profil) {
      throw new Error(`Profil with id ${id} not found`);
    }
    return profil;
  }



  async update(id: number, updateProfilDto: UpdateProfilDto): Promise<Profil> {
    await this.profilRepository.update(id, updateProfilDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profilRepository.delete(id);
  }
}