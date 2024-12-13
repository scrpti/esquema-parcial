import { Component } from '@angular/core';
import { EventosService } from '../../services/eventos.service'
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrar-evento',
  standalone: true,
  imports: [],
  templateUrl: './borrar-evento.component.html',
})
export class BorrarEventoComponent implements OnInit{
  @Input() id: any;

  constructor(private eventoService: EventosService, private router: Router){}

  borrarEvento(id: any){
    console.log(id)
    this.eventoService.deleteEvento(id).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  ngOnInit(): void {}
}
