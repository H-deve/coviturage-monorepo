import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('profil')
@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau profil' })
  @ApiBody({ type: CreateProfilDto })
  create(@Body() createProfilDto: CreateProfilDto) {
    return this.profilService.create(createProfilDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les profils' })
  findAll() {
    return this.profilService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un profil par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.profilService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un profil par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateProfilDto })
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilService.update(+id, updateProfilDto);
  }




  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un profil par ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.profilService.remove(+id);
  }
}