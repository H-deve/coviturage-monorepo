import { PartialType } from '@nestjs/mapped-types';
import { CreateTrajetDto } from './create-trajet.dto';
import { IsDate, IsInt } from 'class-validator';

export class UpdateTrajetDto extends PartialType(CreateTrajetDto) {
  @IsInt()
  nplace: number;

  @IsInt()
  kms: number;

  @IsDate()
  dateT: Date;

  @IsInt()
  utilisateurId: number;

  @IsInt()
  villeDId: number;

  @IsInt()
  villeAId: number;
}




