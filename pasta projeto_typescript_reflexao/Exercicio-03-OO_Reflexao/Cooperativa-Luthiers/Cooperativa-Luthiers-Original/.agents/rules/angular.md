# Angular Rules
- Standalone components obrigatórios, zero NgModules
- Angular 20+ com nova sintaxe de templates (`@if`, `@for`, `@switch`)
- TailwindCSS obrigatório para estilização
- Reactive Forms obrigatório para formulários
- Signals para estado reativo
- HttpClient para consumo de APIs do backend NestJS
- TypeScript strict obrigatório

## Componentização
- Aplicar componentização sempre que possível
- Separar responsabilidades por tipo de componente:
  - Listagem: `entity-list.component`
  - Formulário: `entity-form.component`
  - Visualização/detalhe: `entity-detail.component`
  - Filtros: `entity-filter.component`
  - Item/card de listagem: `entity-card.component`
  - Modal/dialog: `entity-dialog.component`

## Padronização obrigatória de nomes
- Componentes de listagem devem terminar com `-list`
  - Ex: `luthier-list.component.ts`
- Componentes de formulário devem terminar com `-form`
  - Ex: `luthier-form.component.ts`
- Componentes de detalhe/visualização devem terminar com `-detail`
  - Ex: `luthier-detail.component.ts`
- Componentes de filtro devem terminar com `-filter`
  - Ex: `luthier-filter.component.ts`
- Componentes de card/item devem terminar com `-card`
  - Ex: `luthier-card.component.ts`
- Componentes de diálogo/modal devem terminar com `-dialog`
  - Ex: `luthier-dialog.component.ts`

## Estrutura por domínio
- Organizar código por domínio/feature, não por tipo técnico
- Cada domínio deve conter seus próprios components, services, models e routes
- Exemplo:

```txt
features/
  luthiers/
    components/
      luthier-list/
      luthier-form/
      luthier-detail/
      luthier-card/
    services/
      luthier.service.ts
    models/
      luthier.model.ts
    luthiers.routes.ts
  instrumentos/
    components/
      instrumento-list/
      instrumento-form/
    services/
      instrumento.service.ts
    instrumentos.routes.ts
```

## Containers e Presentational Components
* Separar componentes container e presentational sempre que fizer sentido
* Container:
  * Busca dados
  * Controla estado
  * Chama services
  * Trata loading e erro

* Presentational:
  * Apenas exibe dados
  * Emite eventos
  * Não chama HttpClient diretamente
  * Não acessa services de API diretamente

## Templates
* Usar nova sintaxe de controle de fluxo do Angular:
  * `@if` no lugar de `*ngIf`
  * `@for` no lugar de `*ngFor`
  * `@switch` no lugar de `*ngSwitch`
* Em `@for`, sempre declarar `track`
  * Ex: `@for (item of items(); track item.id) { ... }`
* Evitar lógica complexa diretamente no template
* Preferir `computed()` para valores derivados usados na tela

## Estado e reatividade
* Usar Signals para estado local de componentes
* Usar `computed()` para valores derivados
* Usar `effect()` apenas quando necessário
* Evitar Subjects e BehaviorSubjects quando Signals resolverem o caso
* **CRÍTICO:** O token JWT deve ser armazenado APENAS em memória via Signal — NUNCA em `localStorage` ou `sessionStorage`
* RxJS deve ser usado principalmente para fluxos assíncronos, HttpClient e integrações

## Formulários
* Usar Reactive Forms obrigatoriamente
* Não usar Template-driven Forms
* Criar formulário em componente próprio `entity-form`
* Validações devem ficar explícitas no FormGroup/FormControl
* Exibir mensagens de erro por campo
* Desabilitar botão de envio quando o formulário estiver inválido ou em processamento
* Usar tipos fortes nos formulários sempre que possível
* Separar DTOs de criação/edição dos models de visualização

## Services e comunicação com API
* Usar HttpClient para consumir APIs do backend NestJS
* Services devem concentrar chamadas HTTP
* Componentes não devem montar URLs manualmente
* URLs base devem vir de `environment/configuração`
* Tratar erros de API de forma centralizada via interceptor
* Evitar lógica de negócio pesada nos componentes

## Estilização com TailwindCSS
* Usar TailwindCSS como padrão de estilização
* Evitar CSS customizado quando Tailwind resolver
* Manter classes organizadas e legíveis
* Reutilizar padrões visuais em componentes compartilhados
* Evitar duplicação excessiva de classes em telas semelhantes
* Garantir responsividade usando utilitários do Tailwind
* Padronizar estados visuais: loading, erro, sucesso, vazio, desabilitado

## Performance
* Usar `ChangeDetectionStrategy.OnPush` sempre que possível
* Usar `track` obrigatoriamente em `@for`
* Evitar chamadas de métodos diretamente no template quando houver custo computacional
* Preferir `computed()` para cálculos exibidos na tela
* Usar lazy loading de rotas por feature

## UX
* Toda listagem deve prever:
  * estado de carregamento
  * estado vazio
  * estado de erro
  * paginação ou estratégia clara de carregamento

* Todo formulário deve prever:
  * validação visual
  * mensagens de erro
  * botão de salvar desabilitado quando inválido
  * feedback de sucesso ou erro

* Toda tela de detalhe deve prever:
  * carregamento
  * erro ao buscar dados
  * ação de voltar
  * ações principais claramente visíveis
