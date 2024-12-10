import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { AuthConfig } from 'angular-oauth2-oidc'
import { environmet } from '../../../environments/environment'

const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com', // URL del proveedor de OAuth 2.0
  clientId: environmet.CLIENT_ID_MIGUEL,
  redirectUri: window.location.origin, // URL de redirección (debe coincidir con la registrada en el proveedor)
  responseType: 'code', // Tipo de respuesta (usualmente "code" para el flujo de autorización)
  scope: 'openid profile email', // Scopes autorizados
  showDebugInformation: true, // Opcional, para debug en consola
  waitForTokenInMsec: 2000,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oAuthService: OAuthService) {
    oAuthService.configure(authConfig)
  }

  //
  // login() {
  //   this.oauthService.initLoginFlow(); // Redirige al proveedor para iniciar sesión
  // }
  //
  // logout() {
  //   this.oauthService.logOut(); // Cierra sesión
  // }
  //
  // get token() {
  //   return this.oauthService.getAccessToken(); // Obtiene el token de acceso
  // }
}
