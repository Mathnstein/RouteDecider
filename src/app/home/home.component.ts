import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUIService } from '../login/auth-ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthUIService,
    private router: Router
  ) {}

 public ngOnInit(): void {
  if (this.authService.isLoggedIn()) {
    // Direct to the dashboard
    this.router.navigate(['dashboard']);
  }
 }


}
