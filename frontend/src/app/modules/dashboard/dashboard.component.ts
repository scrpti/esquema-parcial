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
  styleUrls: ['./dashboard.component.scss'],
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
        const { name, email, picture, sub } = this.profile();
        this.userService.setUser({
          name,
          email,
          imagen: picture,
          googleId: sub,
        });
        this.user = this.userService.getUser();
      }
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
}
