import { Logger } from '@nestjs/common';
import {
  LuthierRepositoryPort,
  LuthierComInstrumentos,
} from '../../modules/luthier/application/ports/luthier.repository.port';
import { Luthier } from '../../modules/luthier/domain/luthier';

/**
 * Padrão de Projeto Estrutural GOF: Decorator
 *
 * Implementa a mesma interface (LuthierRepositoryPort) que o objeto original,
 * encapsula uma instância interna (innerRepo) e adiciona comportamento de
 * auditoria de operações de persistência sem alterar o código do repositório concreto.
 */
export class LoggingLuthierRepositoryDecorator implements LuthierRepositoryPort {
  private readonly logger = new Logger(LoggingLuthierRepositoryDecorator.name);

  constructor(private readonly innerRepo: LuthierRepositoryPort) {}

  async create(luthier: Luthier): Promise<Luthier> {
    this.logger.log(
      `[GoF Decorator] Criando luthier: ${luthier.nomeMestre}`,
    );
    const created = await this.innerRepo.create(luthier);
    this.logger.log(`[GoF Decorator] Luthier criado com ID: ${created.id}`);
    return created;
  }

  async findAll(): Promise<Luthier[]> {
    this.logger.log('[GoF Decorator] Buscando todos os luthiers');
    return this.innerRepo.findAll();
  }

  async findById(id: number): Promise<Luthier | null> {
    this.logger.log(`[GoF Decorator] Buscando luthier por ID: ${id}`);
    return this.innerRepo.findById(id);
  }

  async findByIdWithInstrumentos(
    id: number,
  ): Promise<LuthierComInstrumentos | null> {
    this.logger.log(
      `[GoF Decorator] Buscando luthier com instrumentos por ID: ${id}`,
    );
    return this.innerRepo.findByIdWithInstrumentos(id);
  }

  async update(luthier: Luthier): Promise<Luthier> {
    this.logger.log(
      `[GoF Decorator] Atualizando luthier ID: ${luthier.id}`,
    );
    return this.innerRepo.update(luthier);
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`[GoF Decorator] Removendo luthier ID: ${id}`);
    return this.innerRepo.delete(id);
  }
}
