import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVilleDto } from './dto/create-ville.dto';
import { UpdateVilleDto } from './dto/update-ville.dto';
import { Ville } from './entities/ville.entity';

@Injectable()
export class VilleService {
  constructor(
    @InjectRepository(Ville)
    private readonly villeRepository: Repository<Ville>,
  ) {}

  async create(createVilleDto: CreateVilleDto): Promise<Ville> {
    const ville = this.villeRepository.create(createVilleDto);
    return await this.villeRepository.save(ville);
  }

  async findAll(): Promise<Ville[]> {
    return await this.villeRepository.find();
  }

  async findOne(id: number): Promise<Ville> {
    const ville = await this.villeRepository.findOne({ where: { id } });
    if (!ville) {
      throw new Error(`Ville with id ${id} not found`);
    }
    return ville;
  }

  async findbyName(nom: string): Promise<Ville> {
    const ville = await this.villeRepository.findOne({ where: { nom } });
    if (!ville) {
      throw new Error(`Ville with name ${nom} not found`);
    }
    return ville;
  }

  async update(id: number, updateVilleDto: UpdateVilleDto): Promise<Ville> {
    await this.villeRepository.update(id, updateVilleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.villeRepository.delete(id);
  }
}