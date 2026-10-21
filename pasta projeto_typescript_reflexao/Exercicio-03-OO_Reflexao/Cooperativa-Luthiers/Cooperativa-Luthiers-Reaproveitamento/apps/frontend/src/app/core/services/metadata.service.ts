import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FieldMetadata {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email';
  required: boolean;
  min?: number;
  max?: number;
}

export interface EntityMetadataResponse {
  entity: string;
  fields: FieldMetadata[];
}

/**
 * Serviço que consome o endpoint de Reflexão do Backend (`/metadata/:entity/fields`).
 * Permite que o frontend descubra dinamicamente as regras de validação e campos obrigatórios.
 */
@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/metadata`;

  /**
   * Obtém os metadados de campos gerados via Reflection no backend.
   */
  getFieldMetadata(entity: string): Observable<EntityMetadataResponse> {
    return this.http.get<EntityMetadataResponse>(
      `${this.apiUrl}/${entity}/fields`,
    );
  }

  /**
   * Lista todas as entidades suportadas com metadados.
   */
  listEntities(): Observable<{ entities: string[] }> {
    return this.http.get<{ entities: string[] }>(this.apiUrl);
  }
}
