import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Utilisateur, UtilisateurService } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  imports: [CommonModule],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs().subscribe((data) => {
      this.utilisateurs = data;
    });
  }

  deleteUtilisateur(id: number): void {
    this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
      this.loadUtilisateurs(); // Refresh the list after deletion
    });
  }
}