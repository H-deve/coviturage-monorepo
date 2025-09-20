import { Marque } from 'src/models/marque/entities/marque.entity';
import { Utilisateur } from 'src/models/utilisateur/entities/utilisateur.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

@Entity('voiture')
export class Voiture {
  map(arg0: (voiture: any) => any): any {
    throw new Error('Method not implemented.');
  }
  static utilisateurId(arg0: () => typeof Voiture, utilisateurId: any): (target: Utilisateur, propertyKey: "voiture") => void {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modele: string;

  @Column()
  place: number;;

  @Column()
  immatriculation: string;

  @Column()
  utilisateurId: number;

  @Column()
  marqueId: number;

  @OneToOne(() => Utilisateur, utilisateur => utilisateur.voiture)
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;

  @OneToOne(() => Marque, marque => marque.voitures)
  @JoinColumn({ name: 'marqueId' })
  marque: Marque;
}