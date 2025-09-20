import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity'; // Adjust the path as needed
import * as bcrypt from 'bcryptjs';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Voiture } from '../voiture/entities/voiture.entity';
import { Marque } from '../marque/entities/marque.entity';
import { Profil } from '../profil/entities/profil.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur) // Inject the repository
    private readonly utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Voiture)
    private readonly voitureRepository: Repository<Voiture>,
    @InjectRepository(Profil)
    private readonly ProfilRepository: Repository<Profil>,
    @InjectRepository(Marque)
    private readonly marqueRepository: Repository<Marque>,
  ) { }

  async findByEmail(email: string): Promise<Utilisateur | undefined> {
    const user = await this.utilisateurRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('utilisteur non trouvé');
    }
    return user;
  }

  async findById(id: number): Promise<Utilisateur | undefined> {
    const user = await this.utilisateurRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('utilisteur non trouvé');
    }
    return user;
  }

  async updateRefreshToken(utilisateurId: number, token: string) {
    const hashedToken = token ? await bcrypt.hash(token, 10) : null;
    await this.utilisateurRepository.update(utilisateurId, {
      refeshToken: hashedToken ?? undefined,
    });
  }

  async updateRefreshTokenNull(id: number, refreshToken: string | null): Promise<void> {
    await this.utilisateurRepository.update(id, { refeshToken: refreshToken ?? '' });
  }



  async create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const user = this.utilisateurRepository.create(createUtilisateurDto);
    return this.utilisateurRepository.save(user);
  }


  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto): Promise<Utilisateur> {
    await this.utilisateurRepository.update(id, updateUtilisateurDto);
    const user = await this.utilisateurRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('utilisteur non trouvé');
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOne(id: number): Promise<Utilisateur | undefined> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
      relations: ['profil', 'voiture'],

    });
    if (!utilisateur) {
      throw new Error(`Utilisateur with id ${id} not found`);
    }
    return utilisateur;
  }

  async updateUtilisateurWithProfilEtVoiture(id: number, updateData: any) {
    const utilisateur = await this.utilisateurRepository.findOne({
        where: { id },
        relations: ['profil', 'voiture'],  // Ensure relations are loaded
    });

    if (!utilisateur) {
        throw new NotFoundException(`Utilisateur with ID ${id} not found`);
    }

    // Update Utilisateur fields
    utilisateur.nom = updateData.nom;
    utilisateur.prenom = updateData.prenom;
    utilisateur.email = updateData.email;
    utilisateur.tel = updateData.tel;
    utilisateur.ville = updateData.ville;

    // Update Profil if it exists
    if (utilisateur.profil) {
        utilisateur.profil.profilImage = updateData.profilImage;
        utilisateur.profil.dateNaissance = updateData.dateNaissance;
        utilisateur.profil.adresse = updateData.adresse;
        await this.ProfilRepository.save(utilisateur.profil);  // Save changes
    }

    // Update Voiture if it exists
    if (utilisateur.voiture) {
        utilisateur.voiture.place = updateData.voiture.place;
        utilisateur.voiture.modele = updateData.voiture.modele;
        utilisateur.voiture.immatriculation = updateData.voiture.immatriculation;

        // ✅ Check if "marque" exists; if not, create it
        let marque = await this.marqueRepository.findOne({ where: { nom: updateData.voiture.marque } });

        if (!marque) {
            console.warn(`Marque "${updateData.voiture.marque}" not found. Creating new marque...`);
            marque = this.marqueRepository.create({ nom: updateData.voiture.marque });
            marque = await this.marqueRepository.save(marque);
        }

        utilisateur.voiture.marque = marque;  // Assign the marque
        utilisateur.voiture.marqueId = marque.id;  // Assign marqueId

        await this.voitureRepository.save(utilisateur.voiture);  // Save voiture changes
    }

    // Save the updated user
    return this.utilisateurRepository.save(utilisateur);
}


  
  async findListInscriptionsForUser(id: number): Promise<Utilisateur | undefined> {
    const user = await this.utilisateurRepository.findOne({
      where: { id },
      relations: ['inscriptions'],
    });
    if (!user) {
      throw new Error(`Utilisateur with id ${id} not found`);
    }
    return user;
  }



}