import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';
import { Voiture } from '../voiture/entities/voiture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profil,Utilisateur,Voiture])],
  controllers: [ProfilController],
  providers: [ProfilService],
  exports : [ProfilService]
})
export class ProfilModule {}
