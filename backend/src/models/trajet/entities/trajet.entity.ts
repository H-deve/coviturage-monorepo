import { Inscription } from 'src/models/inscription/entities/inscription.entity';
import { Ville } from 'src/models/ville/entities/ville.entity';
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';

@Entity('trajet')
export class Trajet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nplace: number;

  @Column()
  kms: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateT: Date;

  @Column()
  prix: string;

  @Column()
  dureeDeTrajet: string;

  @Column()
  villeDId: number;

  @Column()
  villeAId: number;

  @ManyToOne(() => Ville)
  @JoinColumn({ name: 'villeDId' }) 
  villeD: Ville;

  @ManyToOne(() => Ville)
  @JoinColumn({ name: 'villeAId' }) 
  villeA: Ville;

  @Column()
  utilisateurId: number;

  @OneToMany(() => Inscription, (inscription) => inscription.trajet)
  inscriptions: Inscription[];
  
}