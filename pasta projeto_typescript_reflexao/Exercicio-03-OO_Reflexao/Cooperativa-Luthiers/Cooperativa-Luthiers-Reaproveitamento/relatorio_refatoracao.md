# Relatório Técnico de Refatoração: Orientação a Objetos, Padrão Decorator e Reflexão

**Projeto:** Cooperativa de Luthiers (Monorepo)  
**Autor:** Engenharia de Software  
**Data:** 20 de Outubro de 2026  
**Contexto:** Exercício prático acadêmico com foco em Orientação a Objetos (OO), Padrão Decorator, Reflexão (Reflection API) e eliminação sistemática de código duplicado (DRY).

---

## 1. Introdução e Diagnóstico Inicial

O projeto consiste em um sistema de gerenciamento de cooperativas de luthiers (oficinas e instrumentos em manutenção), estruturado em monorepo com **NestJS 11** no backend e **Angular 20** no frontend.

A análise minuciosa do código inicial revelou uma base funcional com boa arquitetura em camadas (Domain-Driven Design / Clean Architecture), porém com **altos índices de duplicação de código**, carência de abstrações reutilizáveis e validações fortemente acopladas tanto no backend quanto no frontend.

---

## 2. Mapeamento dos Pontos de Duplicação Identificados

### 2.1. Backend (`LuthierService` e `InstrumentoService`)
1. **Regras de Negócio e Validações Duplicadas:**
   - Em `LuthierService`, as validações de bancadas (`bancadasNum < 2`, número inteiro), nome e sobrenome completo, e validação cronológica de data de abertura estavam copiadas integralmente entre os métodos `create()` e `update()`.
   - Em `InstrumentoService`, a verificação de existência do luthier, a regra cronológica (`dataEntrada < dataAbertura`), limites de custo (0 a 50.000), consistência de reparo concluído e verificação de duplicidade de modelo em reparo consumiam mais de 45 linhas idênticas duplicadas entre `create()` e `update()`.
2. **Padrão Repetitivo de Busca e Lançamento de Exceção (*Find or Throw*):**
   - Em praticamente todos os métodos (`findById`, `update`, `deactivate`, `delete`), repetia-se o bloco:
     ```typescript
     const entity = await this.repo.findById(id);
     if (!entity) throw new BusinessException('CODE', 'Mensagem', HttpStatus.NOT_FOUND);
     ```
   - Este mesmo padrão era duplicado mais de 10 vezes entre os serviços.

### 2.2. Frontend (`LuthierService` e `InstrumentoService`)
- Os serviços Angular realizavam exatamente as mesmas 5 operações HTTP padrão (`getAll`, `getById`, `create`, `update`, `delete`), mudando apenas a URL e as interfaces tipadas. Cada novo recurso adicionado ao sistema obrigaria a reescrever todos os métodos HTTP.

### 2.3. Frontend Components (Listagens e Formulários)
- **Componentes de Listagem (`LuthierListComponent` e `InstrumentoListComponent`):**
  - Duplicação dos Signals de controle: `data`, `loading`, `error`, `isEmpty`, `itemToDelete`, `deleting`, `searchTerm`.
  - Duplicação da lógica do modal de confirmação de exclusão (`confirmDelete`, `cancelDelete`, fluxo de exclusão reativa com atualização da lista).
- **Componentes de Formulário (`LuthierFormComponent` e `InstrumentoFormComponent`):**
  - Duplicação dos Signals de estado: `saving`, `initialLoading`, `globalError`.
  - Duplicação da lógica de tratamento e exibição de erros do formulário: `fieldHasError(field)`, `getFieldError(field)` e mapeamento de erros retornados pelo backend (`parseAuthError`).

### 2.4. Acoplamento Estático de Campos na Integração
- O frontend precisava conhecer estaticamente todos os campos obrigatórios, tipos e limites mínimos/máximos de cada DTO do backend. Qualquer alteração em regras de validação no backend exigia alterações manuais sincronizadas no código do frontend.

---

## 3. Refatorações Realizadas: Arquitetura e Soluções

### 3.1. Abstrações e Princípios de Orientação a Objetos (OO)

#### A. Backend: Centralização e Encapsulamento
- Criamos métodos utilitários privados em cada serviço:
  - `findOrThrow(id: number)`: encapsula a verificação de existência e padroniza a exceção de negócio `NOT_FOUND`.
  - `validateBusinessRules(...)` e `validateInstrumentoRules(...)`: centralizam todas as regras de negócio em um único ponto, reutilizado por `create()` e `update()`.
- **Benefícios:** Aderência direta ao princípio *DRY (Don't Repeat Yourself)* e ao *Single Responsibility Principle (SRP)*.

#### B. Frontend: Classe Abstrata Genérica `BaseCrudService<T, TCreate, TUpdate, ID>`
Criamos a classe abstrata base em `apps/frontend/src/app/core/services/base-crud.service.ts`:
```typescript
export abstract class BaseCrudService<T, TCreate = Partial<T>, TUpdate = Partial<T>, ID = string | number> {
  protected http = inject(HttpClient);
  protected abstract readonly apiUrl: string;

  getAll(): Observable<T[]> { return this.http.get<T[]>(this.apiUrl); }
  getById(id: ID): Observable<T> { return this.http.get<T>(`${this.apiUrl}/${id}`); }
  create(data: TCreate): Observable<T> { return this.http.post<T>(this.apiUrl, data); }
  update(id: ID, data: TUpdate): Observable<T> { return this.http.put<T>(`${this.apiUrl}/${id}`, data); }
  delete(id: ID): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
```
Com isso, `LuthierService` e `InstrumentoService` passam a estender essa base com menos de 10 linhas de código cada, aplicando **Herança** e **Polimorfismo**:
```typescript
@Injectable({ providedIn: 'root' })
export class LuthierService extends BaseCrudService<LuthierDto, CreateLuthierDto, UpdateLuthierDto, string> {
  protected override readonly apiUrl = `${environment.apiUrl}/luthiers`;
}
```

#### C. Frontend: Classes Base para Componentes (`BaseListComponent` e `BaseFormComponent`)
- `BaseListComponent<T>`: Encapsula os signals reativos `data`, `loading`, `error`, `deleteError`, `itemToDelete`, `deleting`, além dos métodos `confirmDelete`, `cancelDelete` e `performDelete()`.
- `BaseFormComponent`: Encapsula `saving`, `initialLoading`, `globalError`, `fieldHasError(field)`, `getFieldError(field)`, `clearBackendErrors()` e `handleBackendErrors(err)`.
- **Benefícios:** Redução drástica de boilerplate nos componentes de tela, permitindo que os componentes foquem exclusivamente na apresentação.

---

### 3.2. Padrão Decorator

O padrão Decorator foi aplicado em três vertentes distintas para ilustrar sua flexibilidade:

#### 1. Decorator de Propriedade (Property Decorator) com Reflection API
Criado em `apps/backend/src/shared/decorators/validation.decorators.ts`:
- `@RequiredField(label: string)`: marca um campo como obrigatório e registra seu rótulo semântico via `Reflect.defineMetadata`.
- `@FieldType(type)`: define o tipo de dado (`string`, `number`, `boolean`, `date`).
- `@FieldMin(value)` e `@FieldMax(value)`: especificam limites numéricos de negócio.

Exemplo de uso nos DTOs:
```typescript
export class CreateLuthierDto {
  @RequiredField('Nome do Mestre')
  @FieldType('string')
  @IsString()
  @IsNotEmpty()
  nomeMestre: string;

  @RequiredField('Quantidade de Bancadas')
  @FieldType('number')
  @FieldMin(2)
  @IsNumber()
  bancadasNum: number;
}
```

#### 2. Decorator de Método (Method Decorator) para Auditoria e Cross-Cutting Concerns
Criado em `apps/backend/src/shared/decorators/audit.decorator.ts`:
- `@LogExecution(actionName?: string)`: Intercepta a chamada de métodos, calcula com precisão o tempo de execução (latência em milissegundos) e registra logs estruturados para execuções bem-sucedidas ou falhas, sem alterar nenhuma linha do método decorado. Suporta métodos síncronos e assíncronos.
- Aplicado diretamente em métodos dos Controllers e Services:
```typescript
@LogExecution('CriarLuthier')
async create(...) { ... }
```

#### 3. Padrão Estrutural Decorator (Gang of Four - GoF)
Criado em `apps/backend/src/shared/decorators/logging-repository.decorator.ts`:
- A classe `LoggingLuthierRepositoryDecorator` implementa a mesma interface `LuthierRepositoryPort`, encapsula uma instância interna do repositório real e adiciona auditoria de chamadas sem modificar a implementação original do repositório TypeORM.

---

### 3.3. Reflexão (Reflection API) e Integração Dinâmica (Opcional Implementado)

Aproveitando a oportunidade de integração dinâmica sugerida no enunciado, implementamos um fluxo completo onde o **backend expõe as regras de validação dinamicamente e o frontend valida sem conhecimento estático**:

1. **Backend - Endpoint de Reflexão (`GET /metadata/:entity/fields`):**
   - No `MetadataController` (`apps/backend/src/shared/metadata/metadata.controller.ts`), a função `extractFieldMetadata(DtoClass)` inspeciona a classe DTO em tempo de execução via `Reflect.getMetadata()`.
   - Retorna um JSON estruturado com os campos, rótulos, tipos e restrições:
   ```json
   {
     "entity": "luthier",
     "fields": [
       { "name": "nomeMestre", "label": "Nome do Mestre", "type": "string", "required": true },
       { "name": "dataAbertura", "label": "Data de Abertura", "type": "date", "required": true },
       { "name": "bancadasNum", "label": "Quantidade de Bancadas", "type": "number", "required": true, "min": 2 }
     ]
   }
   ```
2. **Frontend - Consumo e Aplicação Dinâmica de Validadores:**
   - Criamos `MetadataService` (`apps/frontend/src/app/core/services/metadata.service.ts`) para consumir o endpoint.
   - Criamos `DynamicFormService` (`apps/frontend/src/app/core/services/dynamic-form.service.ts`), que recebe a lista de `FieldMetadata` e aplica dinamicamente os validadores reativos (`Validators.required`, `Validators.min`, `Validators.max`) aos controles do formulário.
   - Nos componentes de formulário (`LuthierFormComponent` e `InstrumentoFormComponent`), o `ngOnInit` sincroniza dinamicamente as validações diretamente a partir da resposta do backend.

---

## 4. Comparativo Antes vs. Depois

| Aspecto | Antes da Refatoração | Depois da Refatoração |
| :--- | :--- | :--- |
| **Validações no Backend** | Duplicadas integralmente entre `create` e `update` em cada serviço. | Centralizadas em métodos especializados (`SRP` e `DRY`). |
| **Busca por ID e Exceções** | `if (!entity) throw ...` repetido mais de 10 vezes. | Unificado via `findOrThrow()`. |
| **Serviços HTTP no Frontend** | 5 métodos repetidos manualmente para cada entidade. | Classe base genérica `BaseCrudService<T, ID>` via herança OO. |
| **Estados de Listagem e Form** | Signals e handlers duplicados em todos os componentes. | Centralizados em `BaseListComponent<T>` e `BaseFormComponent`. |
| **Auditoria e Observabilidade** | Inexistente ou ad-hoc. | Decorator `@LogExecution()` e Decorator GoF transparentes. |
| **Descoberta de Metadados** | Regras de formulário estáticas e duplicadas no frontend. | Reflexão dinâmica via endpoint `/metadata/:entity/fields`. |

---

## 5. Como Executar e Validar os Testes

### 5.1. Execução de Testes Unitários e de Integração
Todos os testes foram executados e aprovados com sucesso:
```bash
# Executa a suíte de testes do backend (15 suítes / 129 testes aprovados)
pnpm --filter backend test

# Executa especificamente os testes do endpoint de reflexão
pnpm --filter backend test metadata.controller.spec.ts
```

### 5.2. Teste Manual dos Endpoints de Metadados
Com a aplicação em execução (`pnpm dev`):

1. **Metadados do recurso Luthier:**
   ```bash
   curl http://localhost:3000/metadata/luthier/fields
   ```
2. **Metadados do recurso Instrumento:**
   ```bash
   curl http://localhost:3000/metadata/instrumento/fields
   ```
3. **Listagem de todas as entidades registradas:**
   ```bash
   curl http://localhost:3000/metadata
   ```

### 5.3. Validação do Build Completo
```bash
pnpm build
```
O build de todos os pacotes (backend, frontend e utils) é gerado com sucesso sem erros de tipagem TypeScript ou de compilação Angular.

---

## 6. Conclusão

A refatoração elevou o nível de maturidade do projeto, demonstrando na prática:
- **Elegância arquitetural** através de padrões consagrados (GoF Decorator, Method Decorator e Property Decorator).
- **Poder da Reflexão** em TypeScript/Node.js para desacoplamento entre frontend e backend.
- **Maximização do reúso de código** com Orientação a Objetos limpa e moderna.
- **Preservação integral** da cobertura de testes e das regras de negócio originais.
