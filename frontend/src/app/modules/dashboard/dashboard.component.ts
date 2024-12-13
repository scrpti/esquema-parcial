import { CommonModule, JsonPipe, NgIf , NgFor} from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { UserService } from '../../services/user.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  profile: any;
  user: any;
  eventos: any[] = [];
  // token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private eventosService: EventosService,
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
    this.getEventos();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  crearEvento() {
    this.router.navigate(['/crear-evento']);
  }

  toLog() {
    this.router.navigate(['/log']);
  }

  getEventos() {
    this.eventosService.getEventos().subscribe((res) => {
      this.eventos = res;
      console.log(this.eventos);
    });
  }
}
