import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Utilisateur } from './models/utilisateur/entities/utilisateur.entity';
import { Trajet } from './models/trajet/entities/trajet.entity';
import { Inscription } from './models/inscription/entities/inscription.entity';
import { Marque } from './models/marque/entities/marque.entity';
import { Ville } from './models/ville/entities/ville.entity';
import { Voiture } from './models/voiture/entities/voiture.entity';
import { UtilisateurModule } from './models/utilisateur/utilisateur.module';
import { TrajetModule } from './models/trajet/trajet.module';
import { MarqueModule } from './models/marque/marque.module';
import { VilleModule } from './models/ville/ville.module';
import { InscriptionModule } from './models/inscription/inscription.module';
import { VoitureModule } from './models/voiture/voiture.module';
import { ProfilModule } from './models/profil/profil.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';


dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),


    AuthModule,
    UtilisateurModule,
    ProfilModule,
    TrajetModule,
    InscriptionModule,
    MarqueModule,
    VilleModule,
    VoitureModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
