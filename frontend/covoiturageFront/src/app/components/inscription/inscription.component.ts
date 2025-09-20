import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Utilisateur } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

/**
 * ce component permet de gérer l'inscription d'un utilisateur
 * 
 */
export class InscriptionComponent {
  utilisateur: Utilisateur = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'conducteur',
    tel: '',
    ville: '',
    voiture: null
  };

  hasCar: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  passwordStrength: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }


  /**
   *  Fonction permettant de valider une adresse email
   * @param email: string
   * @return boolean
   * @returns void
   */
  onRegister() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    if (!this.hasCar) {
      this.utilisateur.voiture = null;
      this.utilisateur.role = 'passager';
    }

    this.authService.register(this.utilisateur).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Inscription réussie! Redirection vers la page de connexion...';
        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err);
      }
    });
  }

  /**
   * Fonction permettant de changer le rôle de l'utilisateur
   * @returns void
   * 
   */
  onHasCarChange() {
    if (this.hasCar) {
      this.utilisateur.voiture = {
        place: 4,
        marque: '',
        modele: '',
        immatriculation: ''
      };
      this.utilisateur.role = 'conducteur';
    } else {
      this.utilisateur.voiture = null;
      this.utilisateur.role = 'passager';
    }
  }

  /**
   * Fonction permettant de vérifier la force du mot de passe
   * @returns void
   *  
   */
  checkPasswordStrength() {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\d))|((?=.*[A-Z])(?=.*\d))).{6,}$/;

    if (strongRegex.test(this.utilisateur.password)) {
      this.passwordStrength = 'strong';
    } else if (mediumRegex.test(this.utilisateur.password)) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }
  }

  /**
   * Fonction permettant de changer la visibilité du mot de passe
   * @returns void
   * 
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Fonction permettant de vider le message d'erreur
   * @returns void
   * 
   */
  private validateForm(): boolean {
    if (!this.utilisateur.nom || !this.utilisateur.prenom || !this.utilisateur.email ||
      !this.utilisateur.password || !this.utilisateur.tel || !this.utilisateur.ville) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }

    if (!this.validateEmail(this.utilisateur.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return false;
    }

    if (this.hasCar && this.utilisateur.voiture) {
      if (!this.utilisateur.voiture.place || !this.utilisateur.voiture.marque ||
        !this.utilisateur.voiture.modele || !this.utilisateur.voiture.immatriculation) {
        this.errorMessage = 'Veuillez remplir tous les détails de la voiture';
        return false;
      }
    }

    return true;
  }

  /**
   * Fonction permettant de valider une adresse email
   * @param email: string
   * @return boolean
   * 
   */

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private handleError(err: any) {
    if (err.status === 400) {
      this.errorMessage = 'Cet email est déjà utilisé';
    } else if (err.status === 0) {
      this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
    } else {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
  }
}