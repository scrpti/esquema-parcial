import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com', // URL del proveedor de OAuth 2.0
  clientId: 'TU_CLIENT_ID.apps.googleusercontent.com', // ID del cliente obtenido en Google
  redirectUri: window.location.origin, // URL de redirección (debe coincidir con la registrada en el proveedor)
  responseType: 'code', // Tipo de respuesta (usualmente "code" para el flujo de autorización)
  scope: 'openid profile email', // Scopes autorizados
  showDebugInformation: true, // Opcional, para debug en consola
  waitForTokenInMsec: 2000,
};
