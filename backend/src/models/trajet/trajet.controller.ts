import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrajetService } from './trajet.service';
import { CreateTrajetDto } from './dto/create-trajet.dto';
import { UpdateTrajetDto } from './dto/update-trajet.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('trajet')
@Controller('trajet')
export class TrajetController {
  constructor(private readonly trajetService: TrajetService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau trajet' })
  @ApiBody({ type: CreateTrajetDto })
  async create(@Body() createTrajetDto: CreateTrajetDto) {
    return this.trajetService.create(createTrajetDto);
  }

  @Get('findTrajet/:villeD/:villeA/:dateT')
  @ApiOperation({ summary: 'Trouver un trajet par ville de départ, ville d\'arrivée et date' })
  @ApiParam({ name: 'villeD', type: 'number' })
  @ApiParam({ name: 'villeA', type: 'number' })
  @ApiParam({ name: 'dateT', type: 'string' })
  async findTrajet(
    @Param('villeD') villeD: number,
    @Param('villeA') villeA: number,
    @Param('dateT') dateT: string,
  ) {
    const parsedDate = new Date(dateT);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }
    return this.trajetService.findTrajet(+villeD, +villeA, parsedDate);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les trajets' })
  async findAll() {
    return this.trajetService.findAll();
  }

  @Get('details')
  @ApiOperation({ summary: 'Trouver un trajet avec détails par ville de départ, ville d\'arrivée et date' })
  async findTrajetWithDetails(
    @Query('villeD') villeD: number,
    @Query('villeA') villeA: number,
    @Query('dateT') dateT: string,
  ) {
    const parsedDate = new Date(dateT);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }
    return this.trajetService.findTrajetWithDetails(+villeD, +villeA, parsedDate);
  }

  @Get('all-details')
  @ApiOperation({ summary: 'Obtenir tous les trajets avec détails' })
  async findAllTrajetsWithDetails() {
    return this.trajetService.findAllTrajetsWithDetails();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un trajet par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: number) {
    return this.trajetService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un trajet par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateTrajetDto })
  async update(@Param('id') id: number, @Body() updateTrajetDto: UpdateTrajetDto) {
    return this.trajetService.update(+id, updateTrajetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un trajet par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  async remove(@Param('id') id: number) {
    return this.trajetService.remove(+id);
  }
}