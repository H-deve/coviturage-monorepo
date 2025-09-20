import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'; 
import { Profil } from 'src/models/profil/entities/profil.entity';
import { Inscription } from 'src/models/inscription/entities/inscription.entity';
import { Voiture } from 'src/models/voiture/entities/voiture.entity';
import { Role } from 'src/common/enum/role.enum';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Conducteur,
  })
  role: Role;

  @Column()
  tel: string;

  @Column()
  ville: string;

  @Column({ nullable: true })
  refeshToken?: string;

  @OneToOne(() => Profil, profil => profil.utilisateur, { nullable: true })
  @JoinColumn({ name: 'profilId' })
  profil: Profil;

  @OneToMany(() => Inscription, inscription => inscription.utilisateur)
  inscriptions: Inscription[];

  @OneToOne(() => Voiture, voiture => voiture.utilisateur, { nullable: true })
  @JoinColumn({ name: 'voitureId' })
  voiture: Voiture;
}
