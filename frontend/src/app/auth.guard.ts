import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true; // El token es válido, se permite el acceso.
    }
    this.router.navigate(['/login']); // Redirige si no está autenticado.
    return false;
  }
}
