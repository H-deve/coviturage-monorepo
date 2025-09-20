import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarqueDto } from './dto/create-marque.dto';
import { UpdateMarqueDto } from './dto/update-marque.dto';
import { Marque } from './entities/marque.entity';

@Injectable()
export class MarqueService {
  constructor(
    @InjectRepository(Marque)
    private readonly marqueRepository: Repository<Marque>,
  ) {}

  async create(createMarqueDto: CreateMarqueDto): Promise<Marque> {
    const marque = this.marqueRepository.create(createMarqueDto);
    return await this.marqueRepository.save(marque);
  }

  async createMarqueByName(nom : string): Promise<Marque> {
    const marque = this.marqueRepository.create({nom});
    return this.marqueRepository.save(marque);
  }

  async findAll(): Promise<Marque[]> {
    return await this.marqueRepository.find();
  }

  async findOne(id: number): Promise<Marque> {
    const marque = await this.marqueRepository.findOne({ where: { id } });
    if (!marque) {
      throw new Error(`Marque with id ${id} not found`);
    }
    return marque;
  }

  async update(id: number, updateMarqueDto: UpdateMarqueDto): Promise<Marque> {
    await this.marqueRepository.update(id, updateMarqueDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.marqueRepository.delete(id);
  }


    
}