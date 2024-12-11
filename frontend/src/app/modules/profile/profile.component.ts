import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PruebaService } from '../../services/prueba.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userProfile = '';

  constructor(
    private userService: UserService,
    private prueba: PruebaService,
  ) {}

  ngOnInit(): void {
    this.userProfile = this.prueba.getNombre();
    console.log(this.prueba.getNombre());
  }
}
