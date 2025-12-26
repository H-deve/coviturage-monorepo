import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, AuthResponse } from '../api/api.service';
import { Utilisateur } from '../utilisateur/utilisateur.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})

/**
 * Auth service
 * ce service permet de gérer l'authentification
 *  
 */
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(this.checkAuth());
  private userProfile = new BehaviorSubject<Utilisateur | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private nomSubject = new BehaviorSubject<string | null>(null);
  private prenomSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private apiService: ApiService) {
    if (this.isLocalStorageAvailable()) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userIdSubject.next(storedUserId);
      }
    }
  }

  /**
   *  Fonction permettant de stocker l'identifiant de l'utilisateur
   * @param userId 
   */
  setUserId(userId: string) {
    this.userIdSubject.next(userId);
  }

  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  /**
   *  Fonction permettant de vérifier si le local storage est disponible
   * @returns boolean
   */
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   *  Fonction permettant de vérifier si l'utilisateur est authentifié
   * @returns boolean
   */
  private checkAuth(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('accessToken');
    }
    return false;
  }


  /**
   *  Fonction permettant de connecter un utilisateur
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.apiService.login(email, password).subscribe({
        next: (response) => {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userId', response.userId); // Store userId
            // localStorage.setItem('email', response.email); // Store email
            // localStorage.setItem('role', response.role); // Store role
            localStorage.setItem('nom', response.nom); // Store nom
            localStorage.setItem('prenom', response.prenom); // Store prenom
          }
          this.isAuth.next(true);
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  /**
   *  Fonction permettant de récupérer le profil de l'utilisateur
   * @param utilisateur 
   * @returns 
   */
  register(utilisateur: Utilisateur): Observable<Utilisateur> {

    return new Observable((observer) => {
      this.apiService.register(utilisateur).subscribe({
        next: (response) => {
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });

  }

  /**
   * Fonction permettant de récupérer le profil de l'utilisateur
   * 
   */
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // localStorage.removeItem('userId');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
    }
    this.isAuth.next(false);
    this.userProfile.next(null); // Clear user profile on logout
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return new Observable((observer) => {
      this.apiService.refreshToken().subscribe({
        next: (response) => {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            const decodedToken: any = jwtDecode(response.accessToken);

            localStorage.setItem('nom', decodedToken.nom);
            localStorage.setItem('prenom', decodedToken.prenom);
          }
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }


  /*
    *  Fonction permettant de récupérer le profil de l'utilisateur
    * @returns 
    */

  getAuthState(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

}


