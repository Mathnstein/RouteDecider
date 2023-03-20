import { Component } from '@angular/core';
import { AuthUIService } from './auth-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthUIService
  ) {  }

  public async logOut(): Promise<void> {
    await this.authService.logOut();
  }
}
