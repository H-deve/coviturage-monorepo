import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment ';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  private apiUrl = '/api'; // Use the proxy URL
  // private apiUrl = environment.apiUrlGO; // Use the proxy URL for android 


  constructor(private http: HttpClient) { }

  getTrajets(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  findAllTrajetsWithDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trajet/all-details`);
  }

  findTrajetWithDetails(villeD: number, villeA: number, dateT: string): Observable<any> {
    const params = new HttpParams()
      .set('villeD', villeD.toString())
      .set('villeA', villeA.toString())
      .set('dateT', dateT);
    return this.http.get(`${this.apiUrl}/trajet/details`, { params });
  }

  addTrajet(trajet: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/trajet`, trajet);
  }

  deleteTrajet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/trajet/${id}`);
  }

  reserverTrajet(utilisateurId: number, trajetId: number): Observable<any> {
    const reservationData = {
      utilisateurId,
      trajetId,
      dateInscription: new Date().toISOString(), // Current date and time
    };
  
    return this.http.post(`${this.apiUrl}/inscription`, reservationData);
  }

  getCityIdByName(cityName: string): Observable<any> {
    return this.http.get(`/api/ville/findbyName/${cityName}`);
  }
}