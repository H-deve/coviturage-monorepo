import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrajetService } from '../services/trajet/trajet.service';
import { TimePipe } from '../pipe/time.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publier-trajet',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TimePipe],
  templateUrl: './publier-trajet.component.html',
  styleUrls: ['./publier-trajet.component.css']
})

/**
 * PublierTrajetComponent
 * ce Class permet de gérer la publication d'un trajet
 */
export class PublierTrajetComponent {
  publierTrajetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trajetService: TrajetService,
    private router: Router
  ) {
    this.publierTrajetForm = this.fb.group({
      villeD: ['', Validators.required],
      villeA: ['', Validators.required],
      dateT: ['', Validators.required],
      nplace: ['', Validators.required],
      kms: ['', Validators.required],
      prix: ['', Validators.required],
      dureeDeTrajet: ['', Validators.required]
    });
  }


  /**
   *  Fonction permettant de soumettre le formulaire de publication d'un trajet
   * @return void
   * @returns 
   */
  onSubmit() {
    if (this.publierTrajetForm.valid) {
      const formValue = this.publierTrajetForm.value;
      const utilisateurId = localStorage.getItem('userId'); // Get the logged-in user's ID

      if (!utilisateurId) {
        alert('Veuillez vous connecter pour publier un trajet.');
        return;
      }

      this.trajetService.getCityIdByName(formValue.villeD).subscribe(villeDData => {
        this.trajetService.getCityIdByName(formValue.villeA).subscribe(villeAData => {
          const trajetData = {
            ...formValue,
            villeDId: villeDData.id,
            villeAId: villeAData.id,
            utilisateurId: +utilisateurId // Include the utilisateurId
          };
          this.trajetService.addTrajet(trajetData).subscribe({
            next: () => {
              alert('Trajet publié avec succès !');
              this.router.navigate(['/trajet']);
            },
            error: (err) => {
              console.error('Erreur lors de la publication du trajet:', err);
              alert('Erreur lors de la publication du trajet.');
            }
          });
        });
      });
    }
  }
}