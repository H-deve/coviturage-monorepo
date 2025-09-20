import { Trajet } from 'src/models/trajet/entities/trajet.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';

@Entity('ville')
export class Ville {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  cp: number;
  
  @OneToMany(() => Trajet, trajet => trajet.villeD)
  trajetsDepart: Trajet[];

  @OneToMany(() => Trajet, trajet => trajet.villeA)
  trajetsArrivee: Trajet[];

  
}