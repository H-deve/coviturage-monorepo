import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Trajet } from '../trajet/entities/trajet.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscription,Trajet,Utilisateur])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports : [InscriptionService]
})
export class InscriptionModule {}
