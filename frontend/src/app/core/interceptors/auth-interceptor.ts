
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth-service-api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // Attach JWT only when a token exists.
  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authRequest).pipe(
    catchError((error: unknown) => {
      const isHttpError = error instanceof HttpErrorResponse;
      const isUnauthorized = isHttpError && error.status === 401;
      const isLoginRequest = req.url.includes('/api/auth/login');

      // Handle 401 only when the user is inside the protected admin area.
      const isAdminPage =
        router.url.startsWith('/admin/') &&
        !router.url.startsWith('/admin/login');

      if (isUnauthorized && isAdminPage && !isLoginRequest) {
        authService.logout();

        void router.navigate(['/admin/login'], {
          queryParams: { reason: 'session-expired' },
        });
      }

      // Preserve the error so existing components can handle it.
      return throwError(() => error);
    }),
  );
};
