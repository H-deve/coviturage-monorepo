import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VilleService } from './ville.service';
import { CreateVilleDto } from './dto/create-ville.dto';
import { UpdateVilleDto } from './dto/update-ville.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/gaurds/role/RolesGaurd';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/common/gaurds/JwtAuthGuard';

@ApiTags('ville')
@Controller('ville')
// @UseGuards(JwtAuthGuard,RolesGuard)
export class VilleController {
  constructor(private readonly villeService: VilleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ville' })
  @ApiBody({ type: CreateVilleDto })
  create(@Body() createVilleDto: CreateVilleDto) {
    return this.villeService.create(createVilleDto);
  }

 
  @Get()
  // @Roles(Role.Conducteur)  
  @ApiOperation({ summary: 'Obtenir toutes les villes' })
  findAll() {
    return this.villeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une ville par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.villeService.findOne(+id);
  }

  @Get('findbyName/:nom')
  @ApiOperation({ summary: 'Trouver une ville par nom' })
  @ApiParam({ name: 'nom', type: 'string' })
  findbyName(@Param('nom') nom: string) {
    return this.villeService.findbyName(nom);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une ville par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateVilleDto })
  update(@Param('id') id: string, @Body() updateVilleDto: UpdateVilleDto) {
    return this.villeService.update(+id, updateVilleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une ville par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.villeService.remove(+id);
  }
}