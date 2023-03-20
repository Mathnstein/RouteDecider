import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { AuthUIService } from './auth-ui.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthUIService);
  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(['login']);
  }
  return authService.isLoggedIn();
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
