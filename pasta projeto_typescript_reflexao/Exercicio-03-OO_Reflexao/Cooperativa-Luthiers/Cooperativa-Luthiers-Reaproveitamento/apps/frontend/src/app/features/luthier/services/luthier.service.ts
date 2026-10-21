import { Injectable } from '@angular/core';
import { LuthierDto, CreateLuthierDto, UpdateLuthierDto } from '@luthiers/utils';
import { environment } from '../../../../environments/environment';
import { BaseCrudService } from '../../../core/services/base-crud.service';

/**
 * LuthierService refatorado estendendo BaseCrudService (Herança OO).
 * Todas as operações básicas de CRUD são herdadas da classe base.
 */
@Injectable({
  providedIn: 'root',
})
export class LuthierService extends BaseCrudService<
  LuthierDto,
  CreateLuthierDto,
  UpdateLuthierDto,
  string
> {
  protected override readonly apiUrl = `${environment.apiUrl}/luthiers`;
}
