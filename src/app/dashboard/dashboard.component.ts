import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/auth/auth.actions';
import { selectAuthUser } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public user$ = this.store.select(() => selectAuthUser);
  constructor(private store: Store) {}

  public async logOut(): Promise<void> {
    this.store.dispatch(logOut());
  }
}
