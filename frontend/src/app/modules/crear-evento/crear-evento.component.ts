import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearEventoService } from '../../services/crear-evento.service';
import { BotonAtrasComponent } from '../boton-atras/boton-atras.component';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';
import { SubirImagenesService } from '../../services/subir-imagenes.service';
import { MapasService } from '../../services/mapas.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent, MapasComponent],
  templateUrl: './crear-evento.component.html',
})
export class CrearEventoComponent {
  eventoForm: FormGroup;
  imageUrl: string = '';
  lugar: string = '';
  lat: string = '';
  lon: string = '';
  mensaje: string = '';

  constructor(private fb: FormBuilder, private evento: CrearEventoService, private router: Router, private imagenUrl: SubirImagenesService, private mapasService: MapasService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      organizador: ['', Validators.required],
      timestamp: ['', Validators.required],
      imagen: [''],
      lugar: [''],
      mapa: this.fb.group({
        ubicacion: this.fb.group({
          lat: [''],
          lon: ['']
        })
      })
    });
    
  }

  crearEvento() {
    if (this.eventoForm.valid) {
      const eventoData : Evento = {
        nombre: this.eventoForm.get('nombre')?.value,
        timestamp: this.eventoForm.get('timestamp')?.value,
        lugar: "",
        lat: "",
        lon: "",
        organizador: this.eventoForm.get('organizador')?.value,
        imagen: ""
      };
      // Agrega la URL de la imagen al formulario antes de enviar
      eventoData["lugar"] = this.mapasService.getLugar();
      eventoData["lat"]= this.mapasService.getCoordenadas().lat;
      eventoData["lon"] = this.mapasService.getCoordenadas().lon;
      eventoData["imagen"] = this.imagenUrl.getUrl();
      this.imageUrl = this.imagenUrl.getUrl();
      console.log('Imagen:', this.imageUrl);
      console.log('Evento a crear:', eventoData);
      if (this.imageUrl == ""){
        this.mensaje = 'Debes subir una imagen';
        alert(this.mensaje);
      }
      else{
        this.evento.crearEvento(eventoData).subscribe({
          next: (response) => {
            console.log('Evento creado correctamente:', response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al crear el evento:', err);
          },
        });
      }
    } else {
      alert('Formulario no válido');
      console.log('Formulario no válido');
    }
  }
}