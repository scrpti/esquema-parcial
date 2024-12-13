import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotonAtrasComponent } from '../boton-atras/boton-atras.component';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';
import { Router } from '@angular/router';
import { SubirImagenesService } from '../../services/subir-imagenes.service';
import { MapasService } from '../../services/mapas.service';
import { CrearMarcadorService } from '../../services/crear-marcador.service';
import { Marcador } from '../../models/marcador.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-marcador',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent, MapasComponent
  ],
  templateUrl: './crear-marcador.component.html',
})
export class CrearMarcadorComponent {
  marcadorForm: FormGroup;
  imageUrl: string = '';
  lugar: string = '';
  lat: string = '';
  lon: string = '';
  mensaje: string = '';
  email: string | undefined = '';

  constructor(private fb: FormBuilder, private marcador: CrearMarcadorService, private userService: UserService, private router: Router, private imagenUrl: SubirImagenesService, private mapasService: MapasService) {
    this.marcadorForm = this.fb.group({
      email: [''],
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

  crearMarcador() {
    console.log('Formulario:', this.marcadorForm);
    console.log(this.imagenUrl.getUrl())
    console.log(this.userService.getUserEmail())
    this.email = this.userService.getUserEmail()
    if (this.marcadorForm.valid) {
      const marcadorData : Marcador = {
        email: "",
        lugar: "",
        lat: "",
        lon: "",
        imagen: ""
      };
      // Agrega la URL de la imagen al formulario antes de enviar
      marcadorData["lugar"] = this.mapasService.getLugar();
      marcadorData["lat"]= this.mapasService.getCoordenadas().lat;
      marcadorData["lon"] = this.mapasService.getCoordenadas().lon;
      marcadorData["imagen"] = this.imagenUrl.getUrl();
      marcadorData["email"] = this.userService.getUserEmail()!;
      console.log('Email:', this.userService.getUserEmail());
      this.imageUrl = this.imagenUrl.getUrl();
      console.log('Imagen:', this.imageUrl);
      console.log('Marcador a crear:', marcadorData);
      if (this.imageUrl == ""){
        this.mensaje = 'Debes subir una imagen';
        alert(this.mensaje);
      }
      else{
        this.marcador.crearMarcador(marcadorData).subscribe({
          next: (response) => {
            console.log('Marcador creado correctamente:', response);
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
