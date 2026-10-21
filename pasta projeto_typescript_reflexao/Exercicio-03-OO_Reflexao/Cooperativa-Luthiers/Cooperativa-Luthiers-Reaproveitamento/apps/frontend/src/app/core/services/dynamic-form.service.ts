import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { FieldMetadata } from './metadata.service';

/**
 * Serviço responsável por construir e aplicar validações dinâmicas
 * a partir dos metadados recebidos via Reflection do Backend.
 *
 * Implementa a oportunidade opcional descrita no exercício:
 * "o backend forneça os campos obrigatórios dinamicamente via endpoint,
 * para que o frontend faça a validação sem conhecer os campos de forma estática."
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private fb = inject(FormBuilder);

  /**
   * Constrói dinamicamente um FormGroup completo com validações (required, min, max)
   * a partir dos metadados de campos de uma entidade.
   */
  createFormFromMetadata(
    fields: FieldMetadata[],
    initialValues: Record<string, any> = {},
  ): FormGroup {
    const groupConfig: Record<string, any> = {};

    for (const field of fields) {
      const validators: ValidatorFn[] = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }

      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }

      const defaultValue =
        initialValues[field.name] !== undefined
          ? initialValues[field.name]
          : field.type === 'boolean'
            ? false
            : field.type === 'number'
              ? 0
              : '';

      groupConfig[field.name] = [defaultValue, validators];
    }

    return this.fb.group(groupConfig);
  }

  /**
   * Aplica validações dinâmicas a um FormGroup existente com base nos metadados da Reflection.
   */
  applyDynamicValidators(
    form: FormGroup,
    fields: FieldMetadata[],
  ): void {
    for (const field of fields) {
      const control = form.get(field.name);
      if (control) {
        const validators: ValidatorFn[] = [];

        if (field.required) {
          validators.push(Validators.required);
        }

        if (field.min !== undefined) {
          validators.push(Validators.min(field.min));
        }

        if (field.max !== undefined) {
          validators.push(Validators.max(field.max));
        }

        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    }
  }
}
