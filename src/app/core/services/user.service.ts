import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  types: string[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = 'http://localhost:8081/user';

  constructor(private http: HttpClient) {}

  createUser(payload: CreateUserPayload): Observable<void> {
    return this.http.post<void>(this.API_URL, payload);
  }
}

