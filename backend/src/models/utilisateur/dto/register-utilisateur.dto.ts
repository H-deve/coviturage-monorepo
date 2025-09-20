import { Role } from 'src/common/enum/role.enum';
import { CreateVoitureDto } from 'src/models/voiture/dto/create-voiture.dto';

export class RegisterUtilisateurDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: Role;
  tel: string;
  ville: string;
  voiture?: CreateVoitureDto;
}