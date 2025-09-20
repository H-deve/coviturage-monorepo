import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VoitureService } from './voiture.service';
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('voiture')
@Controller('voiture')
export class VoitureController {
  constructor(private readonly voitureService: VoitureService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle voiture' })
  @ApiBody({ type: CreateVoitureDto })
  create(@Body() createVoitureDto: CreateVoitureDto) {
    return this.voitureService.create(createVoitureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les voitures' })
  findAll() {
    return this.voitureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une voiture par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: string) {
    return this.voitureService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une voiture par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateVoitureDto })
  update(@Param('id') id: string, @Body() updateVoitureDto: UpdateVoitureDto) {
    return this.voitureService.update(+id, updateVoitureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une voiture par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.voitureService.remove(+id);
  }
}