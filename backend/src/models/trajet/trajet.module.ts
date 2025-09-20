import { Module } from '@nestjs/common';
import { TrajetService } from './trajet.service';
import { TrajetController } from './trajet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trajet } from './entities/trajet.entity';
import { EmailModule } from '../../email/email.module';
import { Inscription } from '../inscription/entities/inscription.entity';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';
import { Voiture } from '../voiture/entities/voiture.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Trajet, Inscription, Utilisateur , Voiture]), EmailModule],
  controllers: [TrajetController],
  providers: [TrajetService],
  exports: [TrajetService]
  
})
export class TrajetModule {}
