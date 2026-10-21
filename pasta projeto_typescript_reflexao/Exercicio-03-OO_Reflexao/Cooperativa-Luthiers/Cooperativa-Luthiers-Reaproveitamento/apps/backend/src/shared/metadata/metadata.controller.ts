import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  extractFieldMetadata,
  FieldMetadata,
} from '../../shared/decorators/validation.decorators';
import { LogExecution } from '../../shared/decorators/audit.decorator';
import { CreateLuthierDto } from '../../modules/luthier/presentation/dto/create-luthier.dto';
import { CreateInstrumentoDto } from '../../modules/instrumento/presentation/dto/create-instrumento.dto';

/**
 * Registry que mapeia o nome da entidade para seu DTO de criação.
 *
 * Para adicionar um novo recurso, basta registrar o DTO aqui.
 * O endpoint fornecerá os metadados automaticamente via Reflection.
 */
const DTO_REGISTRY: Record<string, new (...args: unknown[]) => unknown> = {
  luthier: CreateLuthierDto as unknown as new (...args: unknown[]) => unknown,
  luthiers: CreateLuthierDto as unknown as new (...args: unknown[]) => unknown,
  instrumento: CreateInstrumentoDto as unknown as new (...args: unknown[]) => unknown,
  instrumentos: CreateInstrumentoDto as unknown as new (...args: unknown[]) => unknown,
};

@ApiTags('Metadados')
@Controller('metadata')
export class MetadataController {
  /**
   * Endpoint que expõe os campos obrigatórios de um recurso via Reflection.
   *
   * O frontend pode consumir este endpoint para construir formulários
   * dinamicamente, sem precisar conhecer os campos de cada entidade
   * de forma estática.
   *
   * Demonstra o conceito de **Reflexão**: em tempo de execução,
   * os metadados definidos pelos decoradores são lidos e retornados.
   */
  @Get(':entity/fields')
  @LogExecution('ObterMetadadosCampos')
  @ApiParam({
    name: 'entity',
    example: 'luthier',
    description: 'Nome do recurso (luthier | instrumento)',
  })
  @ApiOperation({
    summary:
      'Retorna os metadados de validação dos campos obrigatórios de um recurso',
  })
  @ApiResponse({
    status: 200,
    description: 'Metadados dos campos retornados com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Entidade não registrada no sistema.',
  })
  getFields(
    @Param('entity') entity: string,
  ): { entity: string; fields: FieldMetadata[] } {
    const DtoClass = DTO_REGISTRY[entity.toLowerCase()];

    if (!DtoClass) {
      const availableEntities = Object.keys(DTO_REGISTRY).join(', ');
      throw new NotFoundException(
        `Entidade '${entity}' não encontrada. Entidades disponíveis: ${availableEntities}`,
      );
    }

    const fields = extractFieldMetadata(DtoClass);
    return { entity: entity.toLowerCase(), fields };
  }

  /**
   * Lista todas as entidades registradas no sistema.
   */
  @Get()
  @ApiOperation({
    summary: 'Lista todas as entidades que possuem metadados de validação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de entidades retornada com sucesso.',
  })
  listEntities(): { entities: string[] } {
    return { entities: Object.keys(DTO_REGISTRY) };
  }
}
