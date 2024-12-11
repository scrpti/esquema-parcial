import { CommonModule, JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { UserService } from '../../services/user.service';
import { PruebaService } from '../../services/prueba.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: any;
  token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private prueba: PruebaService,
  ) {
    // this.profile = this.authService.profile;
    this.token = this.authService.getToken();
    this.profile = this.authService.getProfile();
  }

  ngOnInit(): void {
    this.prueba.setNombre('Pedrito');
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
