import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private AUTH_API = 'http://localhost:8081/auth';
  private isBrowser = false;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private rolesSubject = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const access = localStorage.getItem('access_token');
      if (access) {
        this.isAuthenticatedSubject.next(true);
        this.rolesSubject.next(this.extractRoles(access));
      }
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (!this.isBrowser) return of(false);
    return this.http
      .post<{ access_token: string; refresh_token?: string }>(`${this.AUTH_API}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
          if (res.refresh_token) {
            localStorage.setItem('refresh_token', res.refresh_token);
          }
          this.isAuthenticatedSubject.next(true);
          this.rolesSubject.next(this.extractRoles(res.access_token));
        }),
        map(() => true)
      );
  }

  logout(): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    // Optional: inform backend
    const refresh = localStorage.getItem('refresh_token');
    const call$ = refresh
      ? this.http.post<void>(`${this.AUTH_API}/logout`, { refresh_token: refresh })
      : of(void 0);

    return call$.pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('sistemaSelecionado');
        this.isAuthenticatedSubject.next(false);
        this.rolesSubject.next([]);
      })
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getRoles$(): Observable<string[]> {
    return this.rolesSubject.asObservable();
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.getValue().includes(role);
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) return true;
    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp as number;
      if (!exp) return true;
      // exp é em segundos
      return exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }

  private extractRoles(token: string): string[] {
    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));
      return payload.resource_access?.mslogin?.roles || [];
    } catch {
      return [];
    }
  }
}
