import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Utilisateur } from '../utilisateur/utilisateur.service';
import { jwtDecode } from 'jwt-decode';


export interface AuthResponse {
  nom: string;
  prenom: string;
  email: string;
  userId: string;
  accessToken: string;
  refreshToken: string;

}

@Injectable({
  providedIn: 'root',
})

/**
 * Api service
 * ce service permet de gérer les requêtes vers l'API
 * 
 */
export class ApiService {
  private apiUrl = '/api';

  /**
   *  Constructor
   * @param http 
   */
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  /**
   *  Fonction permettant de récupérer la liste des utilisateurs
   * @returns Observable<any[]>
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   *  Fonction permettant de connecter un utilisateur
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('email', response.email);
          localStorage.setItem('nom', response.nom);
          localStorage.setItem('prenom', response.prenom);
          // const decodedToken: any = jwtDecode(response.accessToken);
          // localStorage.setItem('userId', decodedToken.userId);
          // localStorage.setItem('email', decodedToken.email);
        } else {
          throw new Error('Invalid login response');
        }
      })
    );
  }
  /**
   * cette fonction permet de récupérer l'ID d'une ville par son nom
   * @param cityName
   * @returns
   * 
   */
  register(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/auth/register`, utilisateur);
  }

  /**
   *  Fonction permettant de récupérer le profil de l'utilisateur
   * 
   * @returns 
   */
  getProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/profil`, { headers: this.getAuthHeaders() });
  }

  // Get utilisateur details by ID
  getUserDetails(userId: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }


  /**
   *  Fonction permettant de mettre à jour le profil de l'utilisateur
   * @returns 
   */
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, null, { headers: this.getAuthHeaders() }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
      })
    );
  }

  // Refresh token
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('email', response.email);
        localStorage.setItem('nom', response.nom);
        localStorage.setItem('prenom', response.prenom);
        // const decodedToken: any = jwtDecode(response.accessToken);
        // localStorage.setItem('userId', decodedToken.userId);
        // localStorage.setItem('email', decodedToken.email);
      })
    );
  }
}