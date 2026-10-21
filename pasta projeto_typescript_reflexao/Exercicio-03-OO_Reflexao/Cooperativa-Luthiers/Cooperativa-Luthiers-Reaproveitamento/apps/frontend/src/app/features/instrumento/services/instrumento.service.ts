import { Injectable } from '@angular/core';
import {
  InstrumentoDto,
  CreateInstrumentoDto,
  UpdateInstrumentoDto,
} from '@luthiers/utils';
import { environment } from '../../../../environments/environment';
import { BaseCrudService } from '../../../core/services/base-crud.service';

/**
 * InstrumentoService refatorado estendendo BaseCrudService (Herança OO).
 * Todas as operações básicas de CRUD são herdadas da classe base.
 */
@Injectable({
  providedIn: 'root',
})
export class InstrumentoService extends BaseCrudService<
  InstrumentoDto,
  CreateInstrumentoDto,
  UpdateInstrumentoDto,
  number
> {
  protected override readonly apiUrl = `${environment.apiUrl}/instrumentos`;
}
