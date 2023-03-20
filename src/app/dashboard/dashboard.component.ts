import { Component } from '@angular/core';
import { AuthUIService } from '../login/auth-ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private authService: AuthUIService
  ) {}

  public async logOut(): Promise<void> {
    await this.authService.logOut();
  }

}
