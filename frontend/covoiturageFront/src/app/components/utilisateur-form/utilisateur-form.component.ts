import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css'],
})
export class UtilisateurFormComponent {
  @Input() utilisateur: Utilisateur = { firstname: '', lastname: '', email: '' };
  @Output() utilisateurSaved = new EventEmitter<void>();

  constructor(private utilisateurService: UtilisateurService) {}

  saveUtilisateur(): void {
    if (this.utilisateur.id) {
      this.utilisateurService.updateUtilisateur(this.utilisateur.id, this.utilisateur).subscribe(() => {
        this.utilisateurSaved.emit();
      });
    } else {
      this.utilisateurService.createUtilisateur(this.utilisateur).subscribe(() => {
        this.utilisateurSaved.emit();
      });
    }
  }
}