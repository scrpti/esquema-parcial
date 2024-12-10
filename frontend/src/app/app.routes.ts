import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el Guard
import { AppComponent } from './app.component'; // Importa el AppComponent
import { MapasComponent } from './modules/mapas/mapas.component';
import { SubirImagenesComponent } from './modules/imagenes/subir-imagenes.component';

export const routes: Routes = [
  {
    path: 'imagenes',
    component: SubirImagenesComponent,
    canActivate: [AuthGuard], // Aplica el Guard aquí
  },{
    path: 'mapas',
    component: MapasComponent,
    canActivate: [AuthGuard], // Aplica el Guard aquí
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
