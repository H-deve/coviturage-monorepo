import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Voiture } from '../voiture/entities/voiture.entity';
import { Profil } from '../profil/entities/profil.entity';
import { Marque } from '../marque/entities/marque.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([Utilisateur,Voiture,Profil ,Marque])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService]
})
export class UtilisateurModule {}
