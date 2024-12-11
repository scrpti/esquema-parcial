import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile: any;

  constructor() {}

  setUserProfile(profile: any) {
    this.userProfile = profile;
  }

  getUserProfile() {
    return this.userProfile;
  }

  clearUserProfile() {
    this.userProfile = null;
  }
}
