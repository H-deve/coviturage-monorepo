import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }


  /**
   * Intercepte les requêtes HTTP sortantes pour ajouter le jeton d'authentification.
   * @param req La requête HTTP sortante.
   * @param next Le gestionnaire de requêtes HTTP.
   * @returns Un Observable des événements HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupère le jeton d'accès depuis le stockage local

    const token = localStorage.getItem('accessToken');
    let authReq = req;

    // Si le jeton existe, clone la requête et ajoute le jeton d'authentification dans les en-têtes

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, refresh the token
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              // Clone the original request with the new access token
              const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${response.accessToken}`)
              });
              return next.handle(clonedRequest);
            }),
            catchError(err => {
              // If refresh token fails, logout the user
              this.authService.logout();
              return throwError(err);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}