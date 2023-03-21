import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/state/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthUIService {
  private auth: Auth = inject(Auth);
  private authUser = inject(Store).select(() => selectAuthUser);
  // constructor(private auth: Auth) {}

  public isLoggedIn(): boolean {
    return this.authUser ? true : false;
  }

  public async logOut(): Promise<void> {
    await this.auth.signOut();
  }
}
