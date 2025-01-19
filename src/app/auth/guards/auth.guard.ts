import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const canActivateChild = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const roles = route.data['roles'] as string[];

  if (authService.isLoggedIn && authService.user) {
    if (roles.includes(authService.user.role)) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const canLoad = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && authService.user?.role) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
