import { MetadataController } from './metadata.controller';
import { NotFoundException } from '@nestjs/common';

describe('MetadataController', () => {
  let controller: MetadataController;

  beforeEach(() => {
    controller = new MetadataController();
  });

  it('deve listar as entidades registradas', () => {
    const result = controller.listEntities();
    expect(result.entities).toContain('luthier');
    expect(result.entities).toContain('instrumento');
  });

  it('deve retornar metadados dos campos de luthier via Reflection', () => {
    const result = controller.getFields('luthier');
    expect(result.entity).toBe('luthier');
    expect(result.fields).toBeInstanceOf(Array);

    const nomeField = result.fields.find((f) => f.name === 'nomeMestre');
    expect(nomeField).toBeDefined();
    expect(nomeField?.required).toBe(true);
    expect(nomeField?.label).toBe('Nome do Mestre');
    expect(nomeField?.type).toBe('string');

    const bancadasField = result.fields.find((f) => f.name === 'bancadasNum');
    expect(bancadasField).toBeDefined();
    expect(bancadasField?.min).toBe(2);
  });

  it('deve retornar metadados dos campos de instrumento via Reflection', () => {
    const result = controller.getFields('instrumento');
    expect(result.entity).toBe('instrumento');
    expect(result.fields).toBeInstanceOf(Array);

    const modeloField = result.fields.find((f) => f.name === 'modeloMadeira');
    expect(modeloField).toBeDefined();
    expect(modeloField?.required).toBe(true);
    expect(modeloField?.label).toBe('Modelo e Madeira');

    const custoField = result.fields.find((f) => f.name === 'custoReparo');
    expect(custoField).toBeDefined();
    expect(custoField?.min).toBe(0);
    expect(custoField?.max).toBe(50000);
  });

  it('deve lançar NotFoundException para entidade não cadastrada', () => {
    expect(() => controller.getFields('desconhecida')).toThrow(
      NotFoundException,
    );
  });
});
