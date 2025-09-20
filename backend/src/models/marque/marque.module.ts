import { Module } from '@nestjs/common';
import { MarqueService } from './marque.service';
import { MarqueController } from './marque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marque } from './entities/marque.entity';
import { Voiture } from '../voiture/entities/voiture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marque,Voiture] )],
  controllers: [MarqueController],
  providers: [MarqueService],
  exports : [MarqueService]
})
export class MarqueModule {}
