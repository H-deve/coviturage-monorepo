import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('utilisateur')
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) { }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({
    schema: {
      example: {
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: '',
        role: 'conducteur',
        tel: '1234567890',
        ville: 'Paris',
      },
    },
  })
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les utilisateurs' })
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un utilisateur par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.utilisateurService.findOne(+id);
  }

  @Get('listeInscriptionsUtilisateur/:id')
  @ApiOperation({ summary: 'Obtenir la liste des inscriptions d\'un utilisateur par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findListeInscriptionsUtilisateur(@Param('id') id: number) {
    return this.utilisateurService.findListInscriptionsForUser(+id);
  }

  @Patch(':id')
  async updateUserProfile(
    @Param('id') id: number,
    @Body() updateData: any
  ) {
    console.log('Received Update Request for User ID:', id);
    console.log(updateData);
    return this.utilisateurService.updateUtilisateurWithProfilEtVoiture(+id, updateData);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({
    schema: {
      example: {
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: '',
        role: 'admin',
        tel: '0987654321',
        ville: 'Lyon',
      },
    },
  })
  update(@Param('id') id: number, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.utilisateurService.update(+id, updateUtilisateurDto);
  }



  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur par ID' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.utilisateurService.remove(+id);
  }
}