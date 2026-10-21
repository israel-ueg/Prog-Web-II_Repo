import { Directive, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Classe Abstrata Base para Componentes de Listagem (Orientação a Objetos - Herança).
 *
 * Centraliza os estados reativos (Signals) de dados, carregamento, erros,
 * termos de busca e o fluxo completo de exclusão com modal de confirmação.
 */
@Directive()
export abstract class BaseListComponent<T> {
  data = signal<T[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  deleteError = signal<string | null>(null);

  isEmpty = computed(() => this.data().length === 0);

  itemToDelete = signal<T | null>(null);
  deleting = signal<boolean>(false);

  searchTerm: string = '';

  /**
   * Abre o modal de confirmação de exclusão para o item fornecido.
   */
  confirmDelete(item: T): void {
    this.itemToDelete.set(item);
    this.deleteError.set(null);
  }

  /**
   * Cancela a exclusão em andamento.
   */
  cancelDelete(): void {
    if (!this.deleting()) {
      this.itemToDelete.set(null);
      this.deleteError.set(null);
    }
  }

  /**
   * Executa a requisição de exclusão, atualizando o estado reativo da lista.
   */
  protected performDelete(
    deleteRequest$: Observable<void>,
    itemId: string | number,
    idKey: keyof T = 'id' as keyof T,
    errorMessage: string = 'Não foi possível excluir o item selecionado.',
  ): void {
    this.deleting.set(true);
    this.deleteError.set(null);

    deleteRequest$.subscribe({
      next: () => {
        this.data.update((items) =>
          items.filter((item) => String(item[idKey]) !== String(itemId)),
        );
        this.deleting.set(false);
        this.itemToDelete.set(null);
      },
      error: () => {
        this.deleting.set(false);
        this.itemToDelete.set(null);
        this.deleteError.set(errorMessage);
      },
    });
  }
}
