import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User | null {
    return this.user;
  }

  setUserName(nombre: string) {
    if (this.user) {
      this.user.name = nombre;
    }
  }

  getUserName() {
    return this.user?.name;
  }

  setUserImagen(url: string) {
    if (this.user) {
      this.user.imagen = url;
    }
  }

  getUserImagen() {
    return this.user?.imagen;
  }

  setUserGoogleId(nombre: string) {
    if (this.user) this.user.name = nombre;
  }

  getUserGoogleId() {
    return this.user?.googleId;
  }

  setUserEmail(emailUsuario: string) {
    if (this.user) this.user.email = emailUsuario;
  }

  getUserEmail() {
    return this.user?.email;
  }

  clearUserProfile() {
    this.user = null;
  }
}
