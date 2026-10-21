import 'reflect-metadata';

// ─── Metadata Keys ──────────────────────────────────────────────────────────

const REQUIRED_FIELDS_KEY = Symbol('requiredFields');
const FIELD_TYPE_KEY = Symbol('fieldType');
const FIELD_MIN_KEY = Symbol('fieldMin');
const FIELD_MAX_KEY = Symbol('fieldMax');
const FIELD_LABEL_KEY = Symbol('fieldLabel');

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface FieldMetadata {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email';
  required: boolean;
  min?: number;
  max?: number;
}

// ─── Property Decorators (Decorator Pattern aplicado a propriedades) ────────

/**
 * Marca um campo do DTO como obrigatório.
 * Utiliza a Reflect API para armazenar metadados no prototype da classe.
 *
 * Este é um exemplo do **padrão Decorator** aplicado via Reflection:
 * em vez de codificar regras no frontend, decoramos as propriedades
 * e lemos os metadados em tempo de execução.
 */
export function RequiredField(label: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existingFields: string[] =
      Reflect.getMetadata(REQUIRED_FIELDS_KEY, target.constructor) ?? [];
    if (!existingFields.includes(String(propertyKey))) {
      existingFields.push(String(propertyKey));
    }
    Reflect.defineMetadata(REQUIRED_FIELDS_KEY, existingFields, target.constructor);
    Reflect.defineMetadata(FIELD_LABEL_KEY, label, target, propertyKey);
  };
}

/**
 * Define o tipo semântico do campo para geração dinâmica de formulários.
 */
export function FieldType(
  type: 'string' | 'number' | 'boolean' | 'date' | 'email',
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(FIELD_TYPE_KEY, type, target, propertyKey);
  };
}

/**
 * Define o valor mínimo aceito (para campos numéricos).
 */
export function FieldMin(value: number): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(FIELD_MIN_KEY, value, target, propertyKey);
  };
}

/**
 * Define o valor máximo aceito (para campos numéricos).
 */
export function FieldMax(value: number): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(FIELD_MAX_KEY, value, target, propertyKey);
  };
}

// ─── Reflection Utility ─────────────────────────────────────────────────────

/**
 * Extrai os metadados de validação de todos os campos de um DTO,
 * utilizando a Reflect API para ler os decoradores aplicados.
 *
 * Esta função demonstra o uso de **Reflexão (Reflection)**:
 * em tempo de execução, o sistema consulta os metadados definidos
 * pelos decoradores para construir a resposta dinamicamente.
 */
export function extractFieldMetadata(
  DtoClass: new (...args: unknown[]) => unknown,
): FieldMetadata[] {
  const requiredFields: string[] =
    Reflect.getMetadata(REQUIRED_FIELDS_KEY, DtoClass) ?? [];

  // Obtém todas as propriedades que possuem metadata de tipo
  const prototype = DtoClass.prototype as object;
  const allPropertyKeys = requiredFields;

  return allPropertyKeys.map((key) => {
    const label: string =
      Reflect.getMetadata(FIELD_LABEL_KEY, prototype, key) ?? key;
    const type: FieldMetadata['type'] =
      Reflect.getMetadata(FIELD_TYPE_KEY, prototype, key) ?? 'string';
    const min: number | undefined = Reflect.getMetadata(
      FIELD_MIN_KEY,
      prototype,
      key,
    );
    const max: number | undefined = Reflect.getMetadata(
      FIELD_MAX_KEY,
      prototype,
      key,
    );

    const metadata: FieldMetadata = {
      name: key,
      label,
      type,
      required: true,
      ...(min !== undefined && { min }),
      ...(max !== undefined && { max }),
    };

    return metadata;
  });
}
