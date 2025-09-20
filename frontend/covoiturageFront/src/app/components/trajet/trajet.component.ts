import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrajetService } from '../../services/trajet/trajet.service';
import { TimePipe } from '../../pipe/time.pipe';
import { Observable, forkJoin } from 'rxjs';
import L from 'leaflet';

@Component({
  selector: 'app-trajet',
  standalone: true,
  imports: [FormsModule, CommonModule, TimePipe],
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.css'],
})

/**
 * Trajet component
 * ce Class permet de gérer les trajets
 * 
 */
export class TrajetComponent implements OnInit {
  villeD: string = '';
  villeA: string = '';
  dateT: string = '';
  passagers: number = 1;
  trajets: any[] = [];
  originalTrajets: any[] = []; // Store the original list of trajets for filtering
  maxPrice: number = 100;
  departTime: string = '';
  carType: string = '';
  map: L.Map | undefined;


  /**
   *  Constructor
   * @param route 
   * @param trajetService 
   * @param platformId 
   */
  constructor(
    private route: ActivatedRoute,
    private trajetService: TrajetService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * ngOnInit
   * cette fonction permet de récupérer les paramètres de recherche à partir de l'URL
   * et de récupérer les trajets en fonction des paramètres de recherche ou de récupérer tous les trajets s'il n'y a pas de paramètres de recherche
   *  
   */
  ngOnInit(): void {
    // Get search parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.villeD = params['villeD'] || '';
      this.villeA = params['villeA'] || '';
      this.dateT = params['dateT'] || '';
      this.passagers = +params['passagers'] || 1;

      // Fetch basé sur les paramètres de recherche
      if (this.villeD && this.villeA && this.dateT) {
        this.fetchTrajets();
      } else {
        this.fetchAllTrajets();
      }
    });
  }

  /**
   * Fonction permettant de rechercher un trajet
   * @returns void
   */

  fetchTrajets() {
    if (!this.villeD || !this.villeA) {
      console.error('City names are not defined');
      return;
    }

    /**
     * Fetch city IDs by name
     * @returns Observable<any>
     */
    forkJoin({
      villeDData: this.getCityIdByName(this.villeD),
      villeAData: this.getCityIdByName(this.villeA)
    }).subscribe({
      next: ({ villeDData, villeAData }) => {
        if (!villeDData || !villeAData) {
          console.error('City data is not defined');
          return;
        }

        const villeDId = villeDData.id;
        const villeAId = villeAData.id;
        this.trajetService.findTrajetWithDetails(villeDId, villeAId, this.dateT).subscribe({
          next: (data) => {
            this.trajets = data;
            this.originalTrajets = [...data]; // Store the original data for filtering
            this.calculateAvailablePlaces();
          },
          error: (err) => {
            console.error('Error fetching trajets:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching city IDs:', err);
      }
    });
  }

  /**
   * Fonction permettant de récupérer tous les trajets
   * @returns void
   * 
   */
  fetchAllTrajets() {
    this.trajetService.findAllTrajetsWithDetails().subscribe({
      next: (data) => {
        this.trajets = data;
        this.originalTrajets = [...data]; // Store the original data for filtering
        this.calculateAvailablePlaces();
      },
      error: (err) => {
        console.error('Error fetching trajets:', err);
      },
    });
  }


  /**
   *  cette fonction permet de récupérer l'ID d'une ville par son nom
   * @param cityName 
   * @returns 
   */
  getCityIdByName(cityName: string): Observable<any> {
    return this.trajetService.getCityIdByName(cityName);
  }

  /**
   * Fonction permettant de filtrer les résultats
   * @returns void
   * 
   */
  calculateAvailablePlaces() {
    this.trajets.forEach((trajet) => {
      trajet.availablePlaces = trajet.nplace - trajet.inscriptions.length;
    });
  }


  /**
   * Fonction permettant de filtrer les résultats
   *
   * 
   */
  filterResults() {
    this.trajets = this.originalTrajets.filter((trajet) => {
      const matchesPrice = trajet.prix <= this.maxPrice;
      const matchesDepartTime = !this.departTime || this.isTimeInRange(trajet.dateT, this.departTime);
      return matchesPrice && matchesDepartTime;
    });
  }

  /**
   *  Fonction permettant de valider une adresse email
   * @param trajetTime
   * @param trajetTime 
   * @param filterTime 
   * @returns 
   */

  isTimeInRange(trajetTime: string, filterTime: string): boolean {
    const trajetDate = new Date(trajetTime);
    const filterDate = new Date(trajetDate.toDateString() + ' ' + filterTime);
    return trajetDate.getTime() >= filterDate.getTime();
  }

  /**
   *  cette fonction permet de réserver un trajet
   *  
   * @param trajetId 
   * @returns 
   */
  reserver(trajetId: number) {
    const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
    if (!userId) {
      alert('Veuillez vous connecter pour réserver un trajet.');
      return;
    }

    // appel de la fonction reserverTrajet du service trajetService pour réserver un trajet
    // 
    this.trajetService.reserverTrajet(+userId, trajetId).subscribe({
      next: () => {
        alert('Réservation réussie !');
        this.fetchAllTrajets(); // Refresh the list of trajets after reservation
      },
      error: (err) => {
        console.error('Error reserving trajet:', err);
        alert('Erreur lors de la réservation.');
      },
    });
  }

  showMap(trajet: any): void {
    // Destroy the map if it already exists
    if (this.map) {
      this.map.remove();
    }
  
    // Check if the coordinates are valid
    if (!trajet || !trajet.villeD || !trajet.villeA || !trajet.villeD.lat || !trajet.villeD.lng || !trajet.villeA.lat || !trajet.villeA.lng) {
      console.warn('Invalid or missing trajet data. Showing default map view.');
      this.map = L.map('map').setView([48.8566, 2.3522], 6); // Default to Paris
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
      return;
    }
  
    // Initialize the map with the departure location
    this.map = L.map('map').setView([trajet.villeD.lat, trajet.villeD.lng], 10);
  
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  
    // Add markers for departure and arrival points
    const markerD = L.marker([trajet.villeD.lat, trajet.villeD.lng]).addTo(this.map);
    markerD.bindPopup(`<b>Départ:</b> ${trajet.villeD.nom}`).openPopup();
  
    const markerA = L.marker([trajet.villeA.lat, trajet.villeA.lng]).addTo(this.map);
    markerA.bindPopup(`<b>Arrivée:</b> ${trajet.villeA.nom}`);
  
    // Draw a polyline between the two points
    const latlngs = [
      [trajet.villeD.lat, trajet.villeD.lng],
      [trajet.villeA.lat, trajet.villeA.lng],
    ];
    L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
  }
}