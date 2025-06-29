// src/app/core/auth/login.guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const token  = auth.getAccessToken();

  if (token) {
    // tenta redirecionar para a última rota válida
    const last = localStorage.getItem('lastRoute');
    if (last && last !== '/login') {
      return router.parseUrl(last);
    }
    // fallback: sistema selecionado ou raiz
    const sistema = localStorage.getItem('sistemaSelecionado')?.toLowerCase() || '';
    return router.parseUrl(sistema ? `/${sistema}` : '/');
  }
  return true;
};
