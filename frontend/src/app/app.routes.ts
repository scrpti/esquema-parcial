import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LogComponent } from './modules/log/log.component';
import { AuthGuard } from './guards/auth.guards';
import { CrearMarcadorComponent } from './modules/crear-marcador/crear-marcador.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'crear-marcador', component: CrearMarcadorComponent, canActivate: [AuthGuard] },
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
];
