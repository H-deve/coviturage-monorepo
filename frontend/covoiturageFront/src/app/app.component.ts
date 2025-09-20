import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule], // Import Router directives
    template: `
  <!-- Header -->
       
    <header>
      
       <div class="logo">
            <a routerLink="">
                <img src="images/logo.webp" alt="Yla GO Logo" class="logo-img">
            </a>
              YLAGO
         </div>
    
        <nav>
       
            <ul class="nav-links">
                <li><a routerLink="">Accueil</a></li>
                <li><a href="#how-it-works">Comment ça marche</a></li>
                <li><a routerLink="/trajet">Trajets</a></li>
                <div class="profile-menu">
                    <img src="images/profile.jpg" alt="Profil" class="profile-icon" />
                    <ul class="dropdown">
                        <li *ngIf="!isAuthenticated"><a routerLink="/connexion">Connexion</a></li>
                        <li *ngIf="!isAuthenticated"><a routerLink="/inscription">Inscription</a></li>
                        <li *ngIf="isAuthenticated"><a routerLink="/profil">Profil</a></li>
                        <li *ngIf="isAuthenticated"><a routerLink="/publier-trajet">Publier un trajet</a></li>
                        <li *ngIf="isAuthenticated"><a href="#" (click)="logout()">Déconnexion</a></li>
                        <li *ngIf="isAuthenticated" class="welcome">Bienvenue, {{nom}} {{prenom}}</li>
                    </ul>
                </div>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">☰</div>
        </nav>
        
    </header>
       <div id="announcement" class="announcement">
                    
        </div>
    
    <!-- Main Content -->
    <main>
        <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Comment voyager avec nous</h4>
                <ul>
                    <li><a href="#">Trajets populaires</a></li>
                    <li><a href="#">Destinations populaires</a></li>
                    <li><a href="#">Voyager en Europe</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Covoiturage</h4>
                <ul>
                    <li><a href="#">Paris → Rennes</a></li>
                    <li><a href="#">Lyon → Paris</a></li>
                    <li><a href="#">Lille → Paris</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>En savoir plus</h4>
                <ul>
                    <li><a href="#">Comment ça marche</a></li>
                    <li><a href="#">Qui sommes-nous ?</a></li>
                    <li><a href="#">Centre d'aide</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Suivez-nous</h4>
                <div class="social-media">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 YLAGO. Tous droits réservés.</p>
        </div>
    </footer>
    
    <script>
        function toggleMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }
    </script>
  `,
    styleUrls: ['./app.component.css']
})

/**
 *  class AppComponent
 * @implements {OnInit}
 * @export
 * 
 * ce class est le composant principal de l'application
 *  il contient le header, le main et le footer
 *  il contient aussi les liens de navigation
 * il contient aussi le script pour le menu hamburger
 *  il contient aussi la fonction logout
 */
export class AppComponent implements OnInit {
    title = 'YlaGo';

    isAuthenticated = false;
    email: string | null = null;
    userId: string | null = null;
    nom: string | null = null;
    prenom: string | null = null;
/**
 *  Creates an instance of AppComponent.
 *  @param {AuthService} authService
 *  @param {Router} router
 * 
 *  @memberof AppComponent
 */
    constructor(private authService: AuthService, private router: Router) { }

    /**
     *  cette fonction permet de verifier si l'utilisateur est connecté
     * si l'utilisateur est connecté, elle recupère les informations de l'utilisateur
     * 
     */
    ngOnInit() {
        this.authService.getAuthState().subscribe((auth) => {
            this.isAuthenticated = auth;
            if (auth) {
                this.userId = localStorage.getItem('userId');
                this.email = localStorage.getItem('email');
                // this.role = localStorage.getItem('role');
                this.nom = localStorage.getItem('nom');
                this.prenom = localStorage.getItem('prenom');
            } else {
                this.userId = null;
                this.email = null;
                // this.role = null;
                this.nom = null;
                this.prenom = null;
            }
        });
    }

    // ngOnInit() {
    //   this.authService.getAuthState().subscribe((auth) => {
    //     this.isAuthenticated = auth;
    //     if (auth) {
    //       this.userId = localStorage.getItem('userId');
    //       this.email = localStorage.getItem('email');
    //     } else {
    //       this.email = null;
    //     }
    //   });
    // }

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    }
}