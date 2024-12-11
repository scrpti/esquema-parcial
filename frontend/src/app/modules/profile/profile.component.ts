import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userProfile = this.userService.getUserProfile();
    console.log(this.userProfile);
  }
}
