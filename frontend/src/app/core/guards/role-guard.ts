import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service-api';

export const roleGuard: CanActivateFn = ( ) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/admin/login']);
  }

  if (authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
