import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(profile: any) {
    this.userProfileSubject.next(profile);
  }

  getUserProfile() {
    return this.userProfileSubject.getValue();
  }

  clearUserProfile() {
    this.userProfileSubject.next(null);
  }
}
