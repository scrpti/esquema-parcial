import { Routes } from "@angular/router";
import { LoginComponent } from "./modules/login/login.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
];
