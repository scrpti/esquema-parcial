import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, NgIf],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  profile: any;
  user: any;
  // token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
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
}
