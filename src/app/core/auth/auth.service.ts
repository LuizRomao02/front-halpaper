import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient }                     from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, of } from 'rxjs';
import { isPlatformBrowser }             from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private AUTH_API = 'http://localhost:8081/auth';
  private isBrowser = false;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private rolesSubject           = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser && localStorage.getItem('access_token')) {
      this.isAuthenticatedSubject.next(true);
      this.rolesSubject.next(this.extractRolesFromToken(localStorage.getItem('access_token')!));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (!this.isBrowser) return of(false);
    return this.http
      .post<{ access_token: string }>(`${this.AUTH_API}/login`, { username, password })
      .pipe(
        tap(res => {
          // só guardamos o access_token
          localStorage.setItem('access_token', res.access_token);
          this.isAuthenticatedSubject.next(true);
          this.rolesSubject.next(this.extractRolesFromToken(res.access_token));
        }),
        map(() => true)
      );
  }

  logout(): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    const refresh = localStorage.getItem('refresh_token')!;
    return this.http
      .post<void>(`${this.AUTH_API}/logout`, { refresh_token: refresh })
      .pipe(
        tap(() => {
          localStorage.clear();
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

  private extractRolesFromToken(token: string): string[] {
    try {
      const payload: any = JSON.parse(atob(token.split('.')[1]));
      return payload.resource_access?.mslogin?.roles || [];
    } catch {
      return [];
    }
  }
}
