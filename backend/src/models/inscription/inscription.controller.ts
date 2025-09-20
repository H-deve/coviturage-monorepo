import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('inscription')
@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'créer une nouvelle inscription' })
  @ApiBody({ type: CreateInscriptionDto })
  create(@Body() createInscriptionDto: CreateInscriptionDto) {
    return this.inscriptionService.create(createInscriptionDto);
  }

  @Post('nouvelleInscription/:utilisateurId/:trajetId')
  @ApiOperation({ summary: 'Créer une nouvelle inscription avec utilisateur et trajet IDs' })
  @ApiParam({ name: 'utilisateurId', type: 'number' })
  @ApiParam({ name: 'trajetId', type: 'number' })
  @ApiBody({
    schema: {
      example: {
        utilisateurId: 1,
        trajetId: 1,
      },
    },
  })
  createWithIds(@Param('utilisateurId') utilisateurId: number, @Param('trajetId') trajetId: number) {
    return this.inscriptionService.createWithIds(+utilisateurId, +trajetId);
  }

  @Get()
  @ApiOperation({ summary: 'Get toutes inscriptions' })
  findAll() {
    return this.inscriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inscription  ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.inscriptionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update inscription  ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateInscriptionDto })
  update(@Param('id') id: string, @Body() updateInscriptionDto: UpdateInscriptionDto) {
    return this.inscriptionService.update(+id, updateInscriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete inscription  ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.inscriptionService.remove(+id);
  }

  @Get('listePassagersConducteur/:trajetId')
  @ApiOperation({ summary: 'Get passengers et conductor pour la trajet' })
  @ApiParam({ name: 'trajetId', type: 'number' })
  findPassengersAndConductor(@Param('trajetId') trajetId: number) {
    return this.inscriptionService.findPassagersConducteur(+trajetId);
  }
}