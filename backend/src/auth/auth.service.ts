import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UtilisateurService} from '../models/utilisateur/utilisateur.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Utilisateur } from 'src/models/utilisateur/entities/utilisateur.entity';
import { VoitureService } from 'src/models/voiture/voiture.service';
import { UpdateUtilisateurDto } from 'src/models/utilisateur/dto/update-utilisateur.dto';
import { Voiture } from 'src/models/voiture/entities/voiture.entity';
import { RegisterUtilisateurDto } from 'src/models/utilisateur/dto/register-utilisateur.dto';

@Injectable()
export class AuthService {
  refreshToken(id: any, refreshToken: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService ,
    private readonly voitureService: VoitureService,
  ) {}

  async validateUser(email:string , password : string){
    const utilisateur = await this.utilisateurService.findByEmail(email);
    if(utilisateur && (await bcrypt.compare(password, utilisateur.password))){
      return utilisateur;
    }

    return null;
  }


   // Register a new user
   async register(registerUserDto: RegisterUtilisateurDto): Promise<{ newUser: Utilisateur; createdVoiture: Voiture | null }> {
    
    const { nom, prenom, email, password, role, tel, ville, voiture } = registerUserDto;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await this.utilisateurService.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      tel,
      ville,

    });
    
    let createdVoiture: Voiture | null = null;
    if (voiture) {
      const voitureEntity = this.voitureService.create({
        ...voiture,
        utilisateurId: newUser.id,
      });
      createdVoiture =  await this.voitureService.save(await voitureEntity);
    }

    return { newUser, createdVoiture};
  }

  
  async updateUser(id: number, updateUserDto: UpdateUtilisateurDto): Promise<{ updatedUser: Utilisateur; updatedVoiture: Voiture | null }> {
    const { nom, prenom, email, password, role, tel, ville, voiture } = updateUserDto;

    // Hash the password if it is provided
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user
    const updatedUser = await this.utilisateurService.update(id, {
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      tel,
      ville,
    });

    let updatedVoiture: Voiture | null = null;
    if (voiture) {
      const voitureEntity = this.voitureService.create({
        ...voiture,
        utilisateurId: updatedUser.id,
      });
      updatedVoiture = await this.voitureService.save(await voitureEntity);
    }

    return { updatedUser, updatedVoiture };
  }

  

  async login (utilisateur : Utilisateur){
    const payload = {email : utilisateur.email, sub : utilisateur.id};
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });

    await this.utilisateurService.updateRefreshToken(utilisateur.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      userId : utilisateur.id,
      nom : utilisateur.nom,
      prenom : utilisateur.prenom,
      email : utilisateur.email,
    }
 
  }

  async refresh(id:number , refreshToken : string){
    const utilisateur = await this.utilisateurService.findById(id);
    if(!utilisateur || utilisateur.refeshToken !== refreshToken){
      throw new UnauthorizedException('Accès refusé');
    }

    const isValid = await bcrypt.compare(refreshToken, utilisateur.refeshToken);
    if(!isValid){
      throw new UnauthorizedException('Accès refusé');
    }
    return this.login(utilisateur);
  }
  
  async logout(userId: number) {
    await this.utilisateurService.updateRefreshTokenNull(userId, null);
    return { message: 'Logout successful' };
  }
}
