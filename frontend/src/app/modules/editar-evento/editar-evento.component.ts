import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotonAtrasComponent } from "../boton-atras/boton-atras.component";
import { SubirImagenesComponent } from "../subir-imagenes/subir-imagenes.component";  // Importa FormsModule
import { SubirImagenesService } from '../../services/subir-imagenes.service';
import { EventosService } from '../../services/eventos.service';


@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, BotonAtrasComponent, SubirImagenesComponent,ReactiveFormsModule],
  templateUrl: './editar-evento.component.html'
})
export class EditarEventoComponent implements OnInit{
  eventoId!: string;
  eventoForm: FormGroup;
  imageUrl: string = ''; // Variable para almacenar la URL
  antiguoNombreEvento: string = '';
  nombreEvento: string = '';
  evento: any
  fechaEvento: any


  constructor(
    private EventoService: EventosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private imagenUrl: SubirImagenesService,
    private location: Location
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      organizador: [''],
      lugar: [''],
    });
  }

  ngOnInit(): void {
    const navegation:any = this.location.getState()
    this.evento = navegation?.evento;
    this.eventoId = this.evento["_id"]
    this.fechaEvento = this.evento["timestamp"]
    this.antiguoNombreEvento = this.evento["nombre"]


    console.log('Evento:', this.evento);

    this.eventoForm.patchValue({
      nombre: this.evento["nombre"],
      fecha: this.evento["timestamp"],
      organizador: this.evento["organizador"],
    })

    // this.EventoService.getEvento(this.eventoId).subscribe({
    //   next: (data) => {
    //     this.eventoForm.patchValue({
    //       nombre: data.nombre,
    //       fecha: data.fecha,
    //     });
    //     this.antiguoNombreEvento = data.nombre;
    //     this.nombreEvento = data.nombre;
    //     this.imageUrl = data.imagenUrl;
    //     this.fechaEvento = data.fecha;
        
    //     console.log('Evento:', data);
    //   },
    //   error: (err) => {
    //     console.error('Error al obtener el evento:', err);
    //   },
    // });
  }

  guardarCambios(): void {
    console.log('Guardando cambios...');
    if (this.eventoForm.valid) {
      const wikiData = this.eventoForm.value;
      console.log('Datos del formulario:', wikiData);
      console.log('Imagen URL:', this.imagenUrl.getUrl());
      this.imageUrl = this.imagenUrl.getUrl();
      wikiData.imagenUrl = this.imageUrl;

      this.EventoService.editEvento(this.eventoId, wikiData).subscribe({
        next: (data) => {
          console.log('Cambios guardados:', data);
          
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
        },
      });
    }else {
      console.log('Formulario no válido');
    }
  }
}
