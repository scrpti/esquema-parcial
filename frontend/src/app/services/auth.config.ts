import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
  // clientId: '3534841119-7jps5d3s9e6ges9rpc8hqiqjt5id5n33.apps.googleusercontent.com',
  clientId:
    '279955462362-vslr6hsb46n5n67keoctg43i0kibn7b1.apps.googleusercontent.com',
  redirectUri: window.location.origin + '/dashboard',
  scope: 'openid profile email',
};
