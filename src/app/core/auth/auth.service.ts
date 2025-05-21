import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    // Aqui futuramente vai chamar sua API e receber o token
    if (email === 'admin@halpaper.com' && password === '123456') {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('token', 'fake-jwt-token'); // Será substituído por token real
      return of(true);
    }

    return of(false);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
