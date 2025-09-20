import { Voiture } from 'src/models/voiture/entities/voiture.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('marque')
export class Marque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Voiture, voiture => voiture.marque)
  // @JoinColumn({ name: 'voitureId' }) 
  voitures: Voiture[];
}