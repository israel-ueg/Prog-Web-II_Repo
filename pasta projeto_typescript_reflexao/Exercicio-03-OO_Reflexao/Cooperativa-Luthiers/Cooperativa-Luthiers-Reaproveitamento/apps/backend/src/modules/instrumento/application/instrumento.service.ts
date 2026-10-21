import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import type { LuthierRepositoryPort } from '../../luthier/application/ports/luthier.repository.port';
import type { InstrumentoRepositoryPort } from './ports/instrumento.repository.port';
import { Instrumento } from '../domain/instrumento';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { LogExecution } from '../../../shared/decorators/audit.decorator';

@Injectable()
export class InstrumentoService {
  constructor(
    @Inject('InstrumentoRepositoryPort')
    private readonly instrumentoRepo: InstrumentoRepositoryPort,

    @Inject('LuthierRepositoryPort')
    private readonly luthierRepo: LuthierRepositoryPort,
  ) {}

  /**
   * Validação centralizada de regras de negócio compartilhadas entre Create e Update.
   * Elimina mais de 40 linhas duplicadas e encapsula o domínio.
   */
  private async validateInstrumentoRules(
    modeloMadeira: string,
    dataEntrada: Date,
    reparoConcluido: boolean,
    custoReparo: number,
    luthierId: number,
    ignoreId?: number,
  ): Promise<void> {
    // INSTRUMENTO_001: Verificar se o Luthier (Oficina) existe
    const luthier = await this.luthierRepo.findById(luthierId);
    if (!luthier) {
      throw new BusinessException(
        'INSTRUMENTO_001',
        `Oficina de Luthier com ID ${luthierId} não encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    // INSTRUMENTO_002: Data de entrada não pode ser anterior à abertura da oficina
    if (new Date(dataEntrada) < new Date(luthier.dataAbertura)) {
      throw new BusinessException(
        'INSTRUMENTO_002',
        'A data de entrada do instrumento não pode ser anterior à abertura da oficina.',
      );
    }

    // INSTRUMENTO_003: Custo do reparo deve estar entre 0 e 50.000
    if (custoReparo < 0 || custoReparo > 50000) {
      throw new BusinessException(
        'INSTRUMENTO_003',
        'O custo do reparo deve ser entre R$ 0,00 e R$ 50.000,00.',
      );
    }

    // INSTRUMENTO_004: Se o reparo está concluído, o custo deve ser maior que zero
    if (reparoConcluido && custoReparo <= 0) {
      throw new BusinessException(
        'INSTRUMENTO_004',
        'Um reparo concluído exige um custo de manutenção maior que zero.',
      );
    }

    // INSTRUMENTO_005: Evitar duplicidade de modelo em reparo para o mesmo luthier
    const todos = await this.instrumentoRepo.findAll();
    const duplicado = todos.find(
      (i) =>
        (ignoreId === undefined || i.id !== ignoreId) &&
        i.modeloMadeira === modeloMadeira &&
        i.reparoConcluido === false &&
        i.luthierId === luthierId,
    );
    if (duplicado) {
      throw new BusinessException(
        'INSTRUMENTO_005',
        'Este luthier já possui um instrumento deste modelo em reparo no momento.',
        HttpStatus.CONFLICT,
      );
    }
  }

  /**
   * Busca um instrumento pelo ID ou lança BusinessException caso não exista.
   * Elimina repetição do padrão "find or throw" em findById, update, deactivate e delete.
   */
  private async findOrThrow(id: number): Promise<Instrumento> {
    const instrumento = await this.instrumentoRepo.findById(id);
    if (!instrumento) {
      throw new BusinessException(
        'INSTRUMENTO_006',
        'Registro de instrumento não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return instrumento;
  }

  @LogExecution('CriarInstrumento')
  async create(
    modeloMadeira: string,
    dataEntrada: Date,
    reparoConcluido: boolean,
    custoReparo: number,
    luthierId: number,
  ): Promise<Instrumento> {
    await this.validateInstrumentoRules(
      modeloMadeira,
      dataEntrada,
      reparoConcluido,
      custoReparo,
      luthierId,
    );

    const instrumento = new Instrumento(
      null,
      modeloMadeira,
      dataEntrada,
      reparoConcluido,
      custoReparo,
      luthierId,
    );
    return this.instrumentoRepo.create(instrumento);
  }

  @LogExecution('AtualizarInstrumento')
  async update(
    id: number,
    modeloMadeira: string,
    dataEntrada: Date,
    reparoConcluido: boolean,
    custoReparo: number,
    luthierId: number,
  ): Promise<Instrumento> {
    const instrumento = await this.findOrThrow(id);

    await this.validateInstrumentoRules(
      modeloMadeira,
      dataEntrada,
      reparoConcluido,
      custoReparo,
      luthierId,
      id,
    );

    instrumento.modeloMadeira = modeloMadeira;
    instrumento.dataEntrada = dataEntrada;
    instrumento.reparoConcluido = reparoConcluido;
    instrumento.custoReparo = custoReparo;
    instrumento.luthierId = luthierId;

    return this.instrumentoRepo.update(instrumento);
  }

  @LogExecution('BuscarTodosInstrumentos')
  async findAll(): Promise<Instrumento[]> {
    return this.instrumentoRepo.findAll();
  }

  @LogExecution('BuscarInstrumentoPorId')
  async findById(id: number): Promise<Instrumento | null> {
    return this.findOrThrow(id);
  }

  @LogExecution('DesativarInstrumento')
  async deactivate(id: number): Promise<Instrumento> {
    const instrumento = await this.findOrThrow(id);
    instrumento.reparoConcluido = true;
    return this.instrumentoRepo.update(instrumento);
  }

  @LogExecution('ExcluirInstrumento')
  async delete(id: number): Promise<void> {
    await this.findOrThrow(id);
    await this.instrumentoRepo.delete(id);
  }
}
