import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService }                    from './auth.service';

export const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const tok    = auth.getAccessToken();
  if (tok) {
    const sys = localStorage.getItem('sistemaSelecionado')?.toLowerCase() || '';
    return router.parseUrl(sys ? `/${sys}` : '/');
  }
  return true;
};
