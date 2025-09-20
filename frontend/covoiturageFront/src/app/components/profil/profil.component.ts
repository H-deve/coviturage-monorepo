import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimePipe } from '../../pipe/time.pipe';
import { Utilisateur, UtilisateurService } from '../../services/utilisateur/utilisateur.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProfilService } from '../../services/profil/profil.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, TimePipe, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

/**
 * Profil component
 * ce Class permet de gérer le profil d'un utilisateur
 * 
 */

export class ProfilComponent implements OnInit {
  userProfile: Utilisateur | null = null;
  profileForm: FormGroup;
  userData: any;


  /**
   * Constructor
   * @param authService: AuthService
   * @param utilisateurService: UtilisateurService
   * @param profilService: ProfilService
   * @param fb: FormBuilder
   */


  constructor(
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private profilService: ProfilService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      ville: ['', Validators.required],
      profilImage: [''],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      voiture: this.fb.group({
        place: [0, Validators.required],
        marque: ['', Validators.required],
        modele: ['', Validators.required],
        immatriculation: ['', Validators.required]
      })
    });
  }

  /**
   *  Fonction permettant de valider une adresse email
   * @param email: string
   * @return boolean
   * 
   */
  async ngOnInit(): Promise<void> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to view your profile.');
      return;
    }

    try {
      this.userData = await lastValueFrom(this.utilisateurService.getUtilisateur(Number(userId)));
      this.userProfile = this.userData;
      this.patchFormValues();
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  /**
   * Fonction permettant de valider une adresse email
   * @param email: string
   * @return boolean
   */
  patchFormValues() {
    if (this.userData) {
      this.profileForm.patchValue(this.userData);
      if (this.userData.voiture) {
        this.profileForm.get('voiture')?.patchValue(this.userData.voiture);
      }
    }
  }

  /**
   * Fonction permettant de valider une adresse email
   * @param email: string
   * @return boolean
   * 
   */

  async onSubmit() {
    if (this.profileForm.valid && this.userProfile) {
      try {
        const updatedData = this.profileForm.value;
        updatedData.id = this.userProfile.id; // Ensure ID is sent

        const response = await lastValueFrom(
          this.utilisateurService.updateUtilisateurWithProfile(this.userProfile.id, updatedData)
        );

        this.userProfile = response;
        this.profileForm.patchValue(response);

        alert('Profile updated successfully!');
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('Error updating profile.');
      }
    }
  }


}