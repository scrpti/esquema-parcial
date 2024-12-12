import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearEventoService } from '../../services/crear-evento.service';
import { BotonAtrasComponent } from '../boton-atras/boton-atras.component';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent, MapasComponent],
  templateUrl: './crear-evento.component.html',
})
export class CrearEventoComponent {
  eventoForm: FormGroup;
  imageUrl: string = '';
  mensaje: string = '';

  constructor(private fb: FormBuilder, private evento: CrearEventoService, private router: Router) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      imagenUrl: [''],
      mapa: this.fb.group({
        ubicacion: this.fb.group({
          lat: [''],
          lon: ['']
        })
      })
    });
    
    // this.eventoForm.get('mapa')?.enable();
  }

  crearEvento() {
    if (this.eventoForm.valid) {
      const eventoData = this.eventoForm.value;
      // Agrega la URL de la imagen al formulario antes de enviar
      eventoData.imagenUrl = this.imageUrl;
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