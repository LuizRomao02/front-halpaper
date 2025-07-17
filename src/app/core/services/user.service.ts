import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Payload para criação de usuário
export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  types: string[];
}

// DTO alinhado com a resposta simplificada para listagem
export interface UserSummaryDTO {
  id: string;
  roles: string[];
  username: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
}

// DTO de detalhes que vem do backend
export interface UserDetailsDTO {
  id: string;
  roles: string[];
  isEnabled: boolean;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  tokenVerification: string;
  createdAt: string;
  updatedAt: string;
}

// Interface genérica de página
export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; unsorted: boolean; sorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = 'http://localhost:8081/users';

  constructor(private http: HttpClient) {}

  /** Cria um novo usuário */
  createUser(payload: CreateUserPayload): Observable<void> {
    return this.http.post<void>(this.API_URL, payload);
  }

  /** Obtém resumo de usuários paginados e filtrados */
  getUsers(
    filtros: Partial<{ fullName: string; email: string; username: string }>,
    page: number,
    size: number
  ): Observable<Page<UserSummaryDTO>> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    Object.entries(filtros).forEach(([key, val]) => {
      if (val != null && val !== '') {
        params = params.set(key, val as string);
      }
    });

    return this.http.get<Page<UserSummaryDTO>>(this.API_URL, { params });
  }

  /** Obtém detalhes completos de um usuário */
  getDetails(id: string): Observable<UserDetailsDTO> {
    return this.http.get<UserDetailsDTO>(
      `${this.API_URL}/${encodeURIComponent(id)}`
    );
  }

  /** Exclui um usuário pelo ID */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${encodeURIComponent(id)}`);
  }

  updateRoles(id: string, roles: string[]): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${encodeURIComponent(id)}`, { roles });
  }
}

