import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';

export const httpResponseHandlerInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const authService = inject(AuthService);

  const authReq = req.clone({
    headers: req.headers
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${authService.token ?? ''}`)
  });

  return next(authReq).pipe(
    tap({
      next: (response) => {
        console.log('HTTP request successful', response);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              console.error('Session expired. Please log in again.');
              authService.logout();
              break;
            case 403:
              console.error(
                'You do not have permission to access this resource.'
              );
              break;
            case 500:
              console.error(
                'An unexpected error occurred on the server. Please try again later.'
              );
              break;
            default:
              console.error(
                `Unhandled HTTP error: ${error.status} - ${error.message}`
              );
              break;
          }
        }
      }
    })
  );
};
