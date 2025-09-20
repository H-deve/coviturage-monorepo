import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[RouterLink , RouterLinkActive , FormsModule ,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

/*
  * Home component
  * ce Class permet de gérer la page d'accueil
  */
export class HomeComponent {
  // departure: string = '';
  // destination: string = '';
  // date: string = '';
  // passagers: number = 1;

  villeD: string = '';
  villeA: string = '';
  dateT: string = '';
  passagers: number = 1; 

  constructor(private router: Router) {}
/**
 * Fonction permettant de valider une adresse email
 * @param email: string
 * @return boolean
 * 
 */
  onSearch() {
    this.router.navigate(['/trajet'], {
      queryParams: {
        villeD: this.villeD,
        villeA: this.villeA,
        dateT: this.dateT,
        passagers: this.passagers,
      },
    }
    )
  }
  // Handle form submission
  // onSearch() {
  //   const queryParams = {
  //     departure: this.departure,
  //     destination: this.destination,
  //     date: this.date,
  //     passagers: this.passagers,
  //   };

    // Navigate to the Trajet page with query parameters
  

  // Increment passagers
  incrementPassagers() {
    if (this.passagers < 10) {
      this.passagers++;
    }
  }

  // Decrement passagers
  decrementPassagers() {
    if (this.passagers > 1) {
      this.passagers--;
    }
  }
}
