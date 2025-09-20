import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Utilisateur } from '../../utilisateur/entities/utilisateur.entity';

@Entity("profil")
export class Profil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  profilImage: string;

  @Column({ type: 'date' })
  dateNaissance: Date;

  @Column({ type: 'varchar', length: 255 })
  adresse: string;

  @OneToOne(() => Utilisateur, utilisateur => utilisateur.profil)
  @JoinColumn()
  utilisateur: Utilisateur;

  
}