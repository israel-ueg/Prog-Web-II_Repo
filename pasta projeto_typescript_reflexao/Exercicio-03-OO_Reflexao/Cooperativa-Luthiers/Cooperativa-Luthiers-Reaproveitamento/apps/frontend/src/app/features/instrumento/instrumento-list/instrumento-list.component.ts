import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InstrumentoDto, LuthierDto } from '@luthiers/utils';
import { InstrumentoService } from '../services/instrumento.service';
import { AuthService } from '../../auth/services/auth.service';
import { LuthierService } from '../../luthier/services/luthier.service';
import { BaseListComponent } from '../../../core/base/base-list.component';

/**
 * InstrumentoListComponent refatorado estendendo BaseListComponent (Herança OO).
 * Estados reativos de lista, busca e exclusão são herdados da classe base.
 */
@Component({
  selector: 'app-instrumento-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './instrumento-list.component.html',
})
export class InstrumentoListComponent
  extends BaseListComponent<InstrumentoDto>
  implements OnInit
{
  private instrumentoService = inject(InstrumentoService);
  private luthierService = inject(LuthierService);
  authService = inject(AuthService);

  luthiersList = signal<LuthierDto[]>([]);

  get filteredItems() {
    if (!this.searchTerm) return this.data();
    const term = this.searchTerm.toLowerCase();
    return this.data().filter((item) =>
      item.modeloMadeira?.toLowerCase().startsWith(term),
    );
  }

  ngOnInit(): void {
    this.loadLuthiers();
    this.loadInstrumentos();
  }

  getLuthierName(luthierId: number): string {
    const luthier = this.luthiersList().find(
      (l) => Number(l.id) === Number(luthierId),
    );
    return luthier ? luthier.nomeMestre : `ID: ${luthierId}`;
  }

  loadLuthiers(): void {
    this.luthierService.getAll().subscribe({
      next: (luthiers) => {
        this.luthiersList.set(luthiers);
      },
    });
  }

  loadInstrumentos(): void {
    this.loading.set(true);
    this.error.set(null);
    this.deleteError.set(null);

    this.instrumentoService.getAll().subscribe({
      next: (instrumentos) => {
        this.data.set(instrumentos);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.message || 'Ocorreu um erro ao buscar os instrumentos.',
        );
        this.loading.set(false);
      },
    });
  }

  executeDelete(): void {
    const target = this.itemToDelete();
    if (!target) return;

    this.performDelete(
      this.instrumentoService.delete(target.id),
      target.id,
      'id',
      'Não foi possível excluir o instrumento selecionado.',
    );
  }
}
