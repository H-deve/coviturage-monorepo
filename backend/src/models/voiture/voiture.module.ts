import { Module } from '@nestjs/common';
import { VoitureService } from './voiture.service';
import { VoitureController } from './voiture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voiture } from './entities/voiture.entity';
import { Marque } from '../marque/entities/marque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voiture,Marque])],
  controllers: [VoitureController],
  providers: [VoitureService],
  exports : [VoitureService]
})
export class VoitureModule {}
