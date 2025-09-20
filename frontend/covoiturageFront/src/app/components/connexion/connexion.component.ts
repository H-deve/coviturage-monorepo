import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

/*
  * Connexion component
  * ce Class permet de gérer la connexion d'un utilisateur
  * 
  
  */
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  /*
  * Fonction permettant de connecter un utilisateur
  *  @param email: string
  * @param password: string
  * @return void
  * 
  */
  login(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate inputs
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    /* Vérifie si l'adresse email est valide */


    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Connexion réussie! Redirection en cours...';
        localStorage.setItem('accessToken', response.accessToken);

        // permet de rediriger l'utilisateur vers la page d'accueil après 1.5 secondes
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else if (err.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
        console.error('Login error:', err);
      }
    });
  }

  /*
  * Fonction permettant de valider le format d'une adresse email
  * @param email: string
  * @return boolean
  * 
  */

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  clearError(): void {
    this.errorMessage = '';
  }
}