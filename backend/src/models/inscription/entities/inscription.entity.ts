import { Trajet } from 'src/models/trajet/entities/trajet.entity';
import { Utilisateur } from 'src/models/utilisateur/entities/utilisateur.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("inscription")
export class Inscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  utilisateurId: number;

  @Column()
  trajetId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateInscription: Date;



  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.inscriptions)
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Trajet, trajet => trajet.inscriptions)
  @JoinColumn({ name: 'trajetId' })
  trajet: Trajet;


}