import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LuthierDto } from '@luthiers/utils';
import { LuthierService } from '../services/luthier.service';
import { AuthService } from '../../auth/services/auth.service';
import { BaseListComponent } from '../../../core/base/base-list.component';

/**
 * LuthierListComponent refatorado estendendo BaseListComponent (Herança OO).
 * Estados reativos de lista, paginação/busca e exclusão são herdados da classe base.
 */
@Component({
  selector: 'app-luthier-list',
  standalone: true,
  imports: [DatePipe, RouterLink, FormsModule],
  templateUrl: './luthier-list.component.html',
})
export class LuthierListComponent
  extends BaseListComponent<LuthierDto>
  implements OnInit
{
  private luthierService = inject(LuthierService);
  authService = inject(AuthService);

  /**
   * Alias para manter compatibilidade com o template existente
   */
  get luthierToDelete() {
    return this.itemToDelete;
  }

  get filteredItems() {
    if (!this.searchTerm) return this.data();
    const term = this.searchTerm.toLowerCase();
    return this.data().filter((luthier) =>
      luthier.nomeMestre?.toLowerCase().startsWith(term),
    );
  }

  ngOnInit(): void {
    this.loadLuthiers();
  }

  loadLuthiers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.luthierService.getAll().subscribe({
      next: (luthiers) => {
        this.data.set(luthiers);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.message || 'Ocorreu um erro ao buscar os luthiers.',
        );
        this.loading.set(false);
      },
    });
  }

  executeDelete(): void {
    const target = this.itemToDelete();
    if (!target) return;

    this.performDelete(
      this.luthierService.delete(target.id),
      target.id,
      'id',
      'Não foi possível excluir o luthier selecionado.',
    );
  }
}
