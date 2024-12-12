import { Component } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html'
})
export class LogComponent {
  //En este componente se hara el log, el cual se mostrara haciendo una peticion get a la base de datos en la coleccion de usuarios
  logs: any[] = [];

  constructor(
    private logService: LogService,
  ) {}
  
  ngOnInit(): void {
    this.obtenerLog();
  }

  obtenerLog(): void {
    this.logService.getLog().subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => {
        console.error("Error al obtener las wikis:", err);
      },
    });
  }

}
