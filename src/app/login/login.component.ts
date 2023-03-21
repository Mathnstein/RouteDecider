import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/auth/auth.actions';
import { selectAuthUser } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user$ = this.store.select(() => selectAuthUser);
  constructor(private store: Store) {}

  public async logOut(): Promise<void> {
    this.store.dispatch(logOut());
  }
}
