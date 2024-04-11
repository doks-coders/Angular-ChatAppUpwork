import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.token$.pipe(map(token => {
    if (token) {

      return true;
    }
    router.navigateByUrl("/register")
    return false;
  }))
};
