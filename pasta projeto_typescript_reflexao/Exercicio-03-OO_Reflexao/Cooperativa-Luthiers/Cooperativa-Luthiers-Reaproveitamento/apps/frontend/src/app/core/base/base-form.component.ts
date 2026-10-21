import { Directive, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { parseAuthError } from '../utils/auth-error.util';

/**
 * Classe Abstrata Base para Componentes de Formulário (Orientação a Objetos - Herança).
 *
 * Centraliza o gerenciamento de estado de submissão, carregamento inicial,
 * captura e formatação de erros globais e de campos (tanto síncronos quanto do backend).
 */
@Directive()
export abstract class BaseFormComponent {
  abstract form: FormGroup;

  initialLoading = signal<boolean>(false);
  saving = signal<boolean>(false);
  globalError = signal<string | null>(null);

  /**
   * Verifica se determinado campo possui erro e foi tocado pelo usuário.
   */
  fieldHasError(field: string): boolean {
    const control = this.form.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  /**
   * Retorna a mensagem amigável de erro para determinado campo.
   */
  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';

    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('min')) return 'Valor abaixo do mínimo permitido';
    if (control.hasError('max')) return 'Valor acima do máximo permitido';
    if (control.hasError('backend')) return control.getError('backend');

    return 'Campo inválido';
  }

  /**
   * Remove erros de validação anteriores provenientes do backend.
   */
  protected clearBackendErrors(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control?.hasError('backend')) {
        control.setErrors(null);
      }
    });
  }

  /**
   * Processa os erros retornados pela API e distribui nos controles do formulário.
   */
  protected handleBackendErrors(err: any): void {
    const parsedErrors = parseAuthError(err);

    if (parsedErrors['global']) {
      this.globalError.set(parsedErrors['global']);
    } else if (err?.error?.message) {
      this.globalError.set(
        Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message,
      );
    } else {
      this.globalError.set('Erro de validação ao salvar dados.');
    }

    Object.keys(parsedErrors).forEach((field) => {
      if (field !== 'global' && this.form.contains(field)) {
        this.form.get(field)?.setErrors({ backend: parsedErrors[field] });
      }
    });
  }
}
