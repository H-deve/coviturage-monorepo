import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
 private apiUrl = '/api'; // Use the proxy URL
  constructor(private http : HttpClient) { }

  getProfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profil`);
  }
  

  updateProfil(id: number, profil: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profil/${id}`, profil);
  }

  deleteProfil(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profil/${id}`);
  }

  getProfilById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profil/${id}`);
  }


  
}
