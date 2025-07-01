import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  const token = auth.getAccessToken();
  if (token) {
    // se expirou, limpa sessão e manda pro login
    if (auth.isTokenExpired(token)) {
      auth.logout().subscribe(() => {
        router.navigate(['/login']);
      });
      // cancela a requisição
      return EMPTY;
    }
    // senão, anexa ao header
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
