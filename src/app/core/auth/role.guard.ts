import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed: string[] = route.data['roles'] ?? [];
  const has = allowed.some(r => auth.hasRole(r));
  if (!has) {
    return router.createUrlTree(['/']);
  }
  return true;
};
