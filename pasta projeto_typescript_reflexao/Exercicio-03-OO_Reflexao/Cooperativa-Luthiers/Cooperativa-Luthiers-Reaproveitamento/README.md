# Cooperativa de Luthiers — Monorepo

Este repositório contém o sistema completo da **Cooperativa de Luthiers**, desenvolvido originalmente para a disciplina de **Programação Web I** na Universidade Estadual de Goiás (UEG) e **refatorado com excelência em Engenharia de Software** com foco em **Orientação a Objetos (OO)**, **Padrão Decorator** (GoF e TypeScript), **Reflexão (Reflection API)** e **Reaproveitamento de Código (DRY)**.

O projeto adota uma arquitetura monorepo com **pnpm workspaces** e orquestrada pelo **Turborepo**.

---

## 👥 Informações do Projeto

- **Tema:** Cooperativa de Luthiers (Tema 7)
- **Instituição:** Universidade Estadual de Goiás (UEG)
- **Foco da Refatoração:** Orientação a Objetos, Padrão Decorator, Metadados via Reflexão e Validação Dinâmica

---

## 📁 Estrutura do Monorepo

```txt
├── apps/
│   ├── backend/           # API REST em NestJS 11 + TypeORM + SQLite + Reflection
│   │   └── src/
│   │       ├── shared/
│   │       │   ├── decorators/   # Decorators customizados (@RequiredField, @FieldType, @LogExecution, Decorator GoF)
│   │       │   └── metadata/     # Controller & Módulo de Reflexão (/metadata/:entity/fields)
│   │       └── modules/          # Módulos Luthier, Instrumento e Usuário
│   └── frontend/          # SPA em Angular 20 + TailwindCSS + Signals
│       └── src/app/
│           └── core/
│               ├── base/         # Abstrações OO (BaseListComponent, BaseFormComponent)
│               └── services/     # BaseCrudService, MetadataService, DynamicFormService
├── packages/
│   ├── eslint-config/     # Padrões estáticos de linting compartilhados
│   ├── typescript-config/ # Configurações base do TypeScript
│   └── utils/             # DTOs, payloads e tipos compartilhados
├── pnpm-workspace.yaml    # Definição dos workspaces do pnpm
├── turbo.json             # Pipelines de execução do Turborepo
├── relatorio_refatoracao.md # Relatório Técnico Detalhado da Refatoração
└── README.md
```

---

## 🚀 Passo a Passo para Iniciar a Aplicação (Após Clonar)

Siga os passos abaixo para rodar o projeto do zero:

### Pré-requisitos
- **Node.js** `>= 20.0.0`
- **PNPM** `>= 9.0.0` (caso não possua, instale via `npm install -g pnpm`)

### 1. Clonar o repositório e instalar dependências
Na raiz do projeto clonado, execute:
```bash
pnpm install
```

### 2. Configurar variáveis de ambiente do Backend
O backend funciona com valores padrão seguros para desenvolvimento, mas você pode configurar o `.env`:
```bash
# No Windows (PowerShell):
Copy-Item apps/backend/.env.example apps/backend/.env

# No Linux/macOS:
cp apps/backend/.env.example apps/backend/.env
```

### 3. Executar o Backend e Frontend simultaneamente
Para iniciar todo o ecossistema com hot-reload via Turborepo:
```bash
pnpm dev
```

Ou, se preferir rodar em terminais separados:
- **Terminal 1 (Backend - NestJS):**
  ```bash
  pnpm --filter backend dev
  ```
- **Terminal 2 (Frontend - Angular):**
  ```bash
  pnpm --filter frontend dev
  ```

### 4. Acessar a aplicação
- 🌐 **Frontend (Web App Angular):** [http://localhost:4200](http://localhost:4200)
- 🔌 **Backend (API NestJS):** [http://localhost:3000](http://localhost:3000)
- 📖 **Swagger (Documentação interativa da API):** [http://localhost:3000/api](http://localhost:3000/api)
- 🔍 **Endpoint de Reflexão de Metadados:** [http://localhost:3000/metadata/luthier/fields](http://localhost:3000/metadata/luthier/fields)

### Credenciais de Acesso Inicial (Seed automático):
- **E-mail:** `admin@cooperativaluthiers.com`
- **Senha:** `Admin@1234`

---

## 🧪 Como Executar os Testes

O projeto conta com suíte completa de testes unitários e de integração no backend cobrindo regras de negócio, serviços, controllers e o novo endpoint de metadados:

```bash
# Rodar todos os testes do backend
pnpm --filter backend test

# Rodar os testes do endpoint de reflexão
pnpm --filter backend test metadata.controller.spec.ts

# Testar e compilar todo o monorepo (Build check)
pnpm build
```

---

## 🏛️ Resumo das Refatorações Realizadas

Para uma explicação detalhada e aprofundada, consulte o documento exclusivo: **[relatorio_refatoracao.md](file:///c:/Users/SAMSUNG/Documents/GitHub/Cooperativa-Luthiers/relatorio_refatoracao.md)**.

1. **Eliminação de Código Duplicado:**
   - **Backend:** Centralização das regras de validação (`validateBusinessRules` e `validateInstrumentoRules`) e do fluxo de busca/exceção (`findOrThrow`), eliminando repetições entre `create`, `update`, `findById`, `deactivate` e `delete`.
   - **Frontend:** Criação da classe abstrata `BaseCrudService<T, ID>` para chamadas HTTP unificadas, e das classes base `BaseListComponent<T>` e `BaseFormComponent` para compartilhamento de estados reativos (Signals), tratamento de erros e confirmação de exclusão.
2. **Padrão Decorator:**
   - **Property Decorators com Reflection:** `@RequiredField()`, `@FieldType()`, `@FieldMin()`, `@FieldMax()` para anotar DTOs e expor regras de validação dinamicamente.
   - **Method Decorator:** `@LogExecution()` para interceptação, medição de tempo de resposta e auditoria cross-cutting sem poluir os métodos de negócio.
   - **Decorator GoF:** `LoggingLuthierRepositoryDecorator` implementando a interface `LuthierRepositoryPort` e encapsulando o repositório real com log decorado.
3. **Reflexão & Integração Dinâmica (Opcional Implementado):**
   - Criação do `MetadataController` (`/metadata/:entity/fields`), que inspeciona classes DTO em tempo de execução via `Reflect.getMetadata()`.
   - No frontend, criação de `MetadataService` e `DynamicFormService` que consom esses metadados para construir e validar formulários dinamicamente sem conhecer previamente os campos de forma estática.
