import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { RefreshAuthGuard } from '../common/gaurds/RefreshAuthGuard';
import { JwtAuthGuard } from '../common/gaurds/JwtAuthGuard';
import { AuthService } from './auth.service';
import { Utilisateur } from 'src/models/utilisateur/entities/utilisateur.entity';
import { VoitureService } from 'src/models/voiture/voiture.service';
import { UpdateUtilisateurDto } from 'src/models/utilisateur/dto/update-utilisateur.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUtilisateurDto } from 'src/models/utilisateur/dto/register-utilisateur.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly voitureService: VoitureService
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Enregistrer un nouvel utilisateur' })
  @ApiBody({
    type: RegisterUtilisateurDto,
    schema: {
      example: {
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: '',
        role: 'conducteur',
        tel: '1234567890',
        ville: 'Paris',
        voiture: {
          place: 5,
          marque: 'Toyota',
          modele: 'Corolla',
          immatriculation: 'ABC-123',
        },
      },
    },
  })
  async register(@Body() registerUserDto: RegisterUtilisateurDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login utilisateur' })
  @ApiBody({
    schema: {
      example: {
        email: 'hajjo.dev@gmail.com',
        password: '',
      },
    },
  })
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update utilisateur' })
  @ApiBody({
    type: UpdateUtilisateurDto,
    schema: {
      example: {
        nom: 'John',
        prenom: 'Doe',
        email: 'john.doe@example.com',
        password: '',
        role: 'admin',
        tel: '0987654321',
        ville: 'Lyon',
        voiture: {
          place: 4,
          marque: 'Honda',
          modele: 'Civic',
          immatriculation: 'XYZ-789',
        },
      },
    },
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUtilisateurDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(@Req() req) {
    return this.authService.refreshToken(req.user.id, req.user.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profil')
  @ApiOperation({ summary: 'Get utilisateur profil' })
  getProfile() {
    return { message: 'Vous êtes authentifié !' };
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Validate refresh token' })
  refreshToken() {
    return { message: 'Refresh token valid!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticated')
  @ApiOperation({ summary: 'Check si authenticated' })
  getAuthenticatedMessage() {
    return { message: 'vous êtes authentifié!' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout utilisateur' })
  async logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }
}