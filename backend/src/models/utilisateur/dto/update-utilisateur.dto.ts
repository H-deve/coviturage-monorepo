import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { UpdateVoitureDto } from 'src/models/voiture/dto/update-voiture.dto';
import { Role } from 'src/common/enum/role.enum';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {

      nom : string;
      prenom : string;
      email : string;
      password : string;
      role : Role ;
      tel : string;
      ville : string;
      voiture?: UpdateVoitureDto;
}
