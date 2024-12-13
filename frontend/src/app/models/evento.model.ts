export interface Evento {
    nombre: string;
    timestamp: Date;
    lugar: string; 
    lat: string; //Se sacan con geocoding
    lon: string; //Se sacan con geocoding
    organizador: string;
    imagen: string;
  }  