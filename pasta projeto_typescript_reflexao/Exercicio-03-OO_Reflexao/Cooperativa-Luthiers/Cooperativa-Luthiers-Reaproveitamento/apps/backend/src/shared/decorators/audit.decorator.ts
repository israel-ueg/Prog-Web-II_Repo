import { Logger } from '@nestjs/common';

/**
 * Decorator de Método para logging e auditoria de execução.
 *
 * Exemplo do padrão Decorator via TypeScript Method Decorator:
 * Intercepta a chamada de métodos, suportando tanto métodos síncronos
 * quanto assíncronos (Promises), calcula o tempo de execução e
 * emite logs estruturados sem modificar o código do método original.
 */
export function LogExecution(actionName?: string): MethodDecorator {
  const logger = new Logger('MethodExecutionAudit');

  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    const name = actionName || String(propertyKey);
    const className = target.constructor?.name || 'Class';

    descriptor.value = function (...args: any[]) {
      const start = Date.now();
      logger.log(`[INÍCIO] ${className}.${name}`);

      try {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result
            .then((res) => {
              const duration = Date.now() - start;
              logger.log(
                `[SUCESSO] ${className}.${name} executado em ${duration}ms`,
              );
              return res;
            })
            .catch((error) => {
              const duration = Date.now() - start;
              logger.warn(
                `[FALHA] ${className}.${name} falhou em ${duration}ms: ${error?.message || error}`,
              );
              throw error;
            });
        }

        const duration = Date.now() - start;
        logger.log(`[SUCESSO] ${className}.${name} executado em ${duration}ms`);
        return result;
      } catch (error: any) {
        const duration = Date.now() - start;
        logger.warn(
          `[FALHA] ${className}.${name} falhou em ${duration}ms: ${error?.message || error}`,
        );
        throw error;
      }
    };

    return descriptor;
  };
}
