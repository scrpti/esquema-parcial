import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CrearEventoComponent } from './modules/crear-evento/crear-evento.component';
import { LogComponent } from './modules/log/log.component';
import { AuthGuard } from './guards/auth.guards';
import { EditarEventoComponent } from './modules/editar-evento/editar-evento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'crear-evento', component: CrearEventoComponent, canActivate: [AuthGuard] },
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'editar-evento', component: EditarEventoComponent, canActivate: [AuthGuard] },
];
