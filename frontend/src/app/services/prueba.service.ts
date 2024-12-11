import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PruebaService {
  nombre = '';

  constructor() {}
  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  getNombre() {
    return this.nombre;
  }
}
