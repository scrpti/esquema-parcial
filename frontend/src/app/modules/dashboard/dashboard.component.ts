import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGoogleService } from "../../services/auth-google.service";

const MODULES = [CommonModule];

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [MODULES],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  profile: any;
  token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
  ) {
    // this.profile = this.authService.profile;
    this.token = this.authService.getToken();
    this.profile = this.authService.getProfile();
    effect(() => {
      console.log("Perfil actualizado:", this.profile());
    });
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
