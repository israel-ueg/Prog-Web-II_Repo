import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Classe Abstrata Base para Serviços CRUD no Frontend (Orientação a Objetos - Herança & Polimorfismo).
 *
 * Encapsula as operações HTTP padronizadas (GET, POST, PUT, DELETE),
 * eliminando a duplicação de código entre LuthierService, InstrumentoService
 * e qualquer futuro serviço CRUD da aplicação.
 */
export abstract class BaseCrudService<
  T,
  TCreate = Partial<T>,
  TUpdate = Partial<T>,
  ID = string | number,
> {
  protected http = inject(HttpClient);

  /**
   * Endpoint base do recurso (ex: `${environment.apiUrl}/luthiers`)
   */
  protected abstract readonly apiUrl: string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: TCreate): Observable<T> {
    return this.http.post<T>(this.apiUrl, data);
  }

  update(id: ID, data: TUpdate): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
