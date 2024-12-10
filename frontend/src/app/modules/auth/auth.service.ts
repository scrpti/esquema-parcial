import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'app-root',
  template: `<button (click)="login()">Login</button>`,
})
export class AppComponent implements OnInit {
  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin(); // Carga metadatos y verifica autenticación
  }

  login() {
    this.oauthService.initLoginFlow(); // Redirige al proveedor para iniciar sesión
  }

  logout() {
    this.oauthService.logOut(); // Cierra sesión
  }

  get token() {
    return this.oauthService.getAccessToken(); // Obtiene el token de acceso
  }
}
