import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { TrajetComponent } from './components/trajet/trajet.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth/guard/auth.guard.service';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/api/auth.intercepter';
import { TimePipe } from './pipe/time.pipe';
import { PublierTrajetComponent } from './publier-trajet/publier-trajet.component';
import { ProfilComponent } from './components/profil/profil.component';


export const routes: Routes = [
  // { path: '', component: UtilisateurListComponent },
  // { path: 'create', component: UtilisateurFormComponent },
  // { path: 'edit/:id', component: UtilisateurFormComponent },
  { path: '', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'trajet', component: TrajetComponent },
  { path: 'publier-trajet', component: PublierTrajetComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },

];

@NgModule({

  imports: [
    BrowserModule,
    TimePipe,
    CommonModule,
    FormsModule,

    RouterModule.forRoot(routes)

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class AppRoutingModule { }