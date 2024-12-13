import { CommonModule, JsonPipe, NgIf , NgFor} from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { UserService } from '../../services/user.service';
import { EventosService } from '../../services/eventos.service';
import { MapasComponent } from '../mapas/mapas.component';
import { BorrarEventoComponent } from '../borrar-evento/borrar-evento.component';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';
import { MapasService } from '../../services/mapas.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MarcadoresService } from '../../services/marcadores.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, MapasComponent, BorrarEventoComponent , EditarEventoComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  profile: any;
  user: any;
  marcadores : any;
  lat: string = "";
  lon: string = "";
  // token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private mapasService: MapasService,
    private marcadoresService: MarcadoresService,
  ) {
    this.profile = this.authService.profile;
    effect(() => {
      if (this.profile) {
        console.log("Profile: ", this.profile());
        const {email, sub, jti, exp} = this.profile();
        this.userService.setUser({
          token: jti,
          email,
          timestamp: Date.now(),
          caducidad: exp,
          googleId: sub,
        });
        this.user = this.userService.getUser();
      }
      console.log
      this.userService.crearUsuario(this.user).subscribe((res) => {
        console.log(res);
      }
      );
    });
  }

  ngOnInit(): void {
    // this.profile.subscribe((profile: any) => {
    //   if (profile) {
    //     console.log(profile);
    //     const { name, email, picture, sub } = profile;
    //     this.userService.setUser({
    //       name,
    //       email,
    //       imagen: picture,
    //       googleId: sub,
    //     });
    //   }
    // });
    this.obtenerMarcadores();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  crearMarcador() {
    this.router.navigate(['/crear-marcador']);
  }

  toLog() {
    this.router.navigate(['/log']);
  }

  obtenerMarcadores(): void {
    this.marcadoresService.getMarcadores().subscribe({
      next: (marcadores) => {
        this.marcadores = marcadores;
        console.log(this.marcadores["marcadores"]);
        console.log("Marcadores obtenidos correctamente:", marcadores);
        this.obtenerCoordenadasDeLosMarcadores(this.marcadores["marcadores"]);
        //Aqui definimos que se vayan poniendo los marcadores en el mapa
        //Iteraremos entre los diferentes marcadores y los iremos poniendo en el mapa
        // this.marcadores["marcadores"].forEach((marcador: any) => {
        //   const lat = marcador.lat;
        //   const lon = marcador.lon;
        //   this.mapasService.searchByQuery({ lat: parseFloat(lat), lon: parseFloat(lon) });
        // });
        
        this.lat = this.marcadores["marcadores"][0].lat;
        this.lon = this.marcadores["marcadores"][0].lon;
        console.log("Coordenadas:" + this.lat, this.lon);  
      },
      error: (error) => {
        console.error("Error al obtener los marcadores:", error);
      }
    });
  }

  obtenerCoordenadasDeLosMarcadores(marcadores: any): any {
    let coordenadas: any[] = [];
    marcadores.forEach((marcador: any) => {
      console.log(marcador.lat, marcador.lon);
      coordenadas.push(this.coordToGroup(marcador.lat, marcador.lon));
    });
    return coordenadas;
  }

  coordToGroup(lat:string, lon:string): FormGroup{
    return new FormGroup({
      lat: new FormControl(lat),
      lon: new FormControl(lon)
    })

  }


  // cargarMapa() {
  //   this.mapasService.searchByQuery().subscribe({
  //     next: (mapa) => {
        
  //     },
  //     error: (err) => {
  //       console.error("Error al obtener el mapa:", err);
  //     },
  //   });
  // }
}
