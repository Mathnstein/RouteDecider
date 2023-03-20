import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUIService {
  private auth: Auth = inject(Auth);
  // constructor(private auth: Auth) {}

  public isLoggedIn(): boolean {
    return this.auth.currentUser ? true: false;
  }

  public async logOut(): Promise<void> {
    await this.auth.signOut();
  }

}
