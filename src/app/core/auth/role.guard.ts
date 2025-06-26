import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  const allowed: string[] = route.data['roles'] ?? [];
  const has = allowed.some(r => auth.hasRole(r));
  if (!has) {
    // opcional: você pode mandar pra um "403" ou dashboard
    router.navigate(['/']);
  }
  return has;
};
