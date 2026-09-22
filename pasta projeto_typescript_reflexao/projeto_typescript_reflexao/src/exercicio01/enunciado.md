# Exercício 01: Processador Universal de Entidades com Reflexão e Duck Typing em TypeScript

## 🎯 Objetivo do Exercício

Neste exercício, você aplicará os conceitos de **Reflexão (Introspecção, Intercepção e Modificação Dinâmica)**, **Duck Typing** e **Type Guards** em TypeScript. 

Você construirá um **Processador Universal de Entidades** capaz de examinar objetos, invocar seus métodos, alterar seus atributos e aplicar regras de negócio em instâncias de classes do sistema e em **classes de terceiros** (que não herdam de nenhuma classe base comum nem implementam interfaces do seu projeto).

---

## 📚 Conceitos Abordados

1. **Introspecção de Protótipo e Instância**: `Object.getPrototypeOf()`, `Object.getOwnPropertyNames()`, `Object.keys()` e `objeto.constructor.name`.
2. **Filtragem de Métodos**: Isolamento dos métodos da classe no protótipo eliminando a propriedade especial `constructor`.
3. **Invocação Dinâmica e Modificação**: Notação de colchetes `(obj as any)[chave]` para leitura, escrita e chamada de métodos por `string`.
4. **Duck Typing vs Polimorfismo por Herança**: Processamento de objetos de bibliotecas externas sem acesso ao código-fonte.
5. **Type Guards no TypeScript**: Garantia de segurança de tipos em runtime com `obj is Interface`.

---

## 📋 Especificação das Tarefas

---

### 🔹 Parte 1: Utilitário de Introspecção (`InspectorUtils.ts`)

Crie um módulo ou classe utilitária com a função `inspecionarObjeto(objeto: any): void` que deve imprimir no console:
1. **Nome da classe** da qual o objeto foi instanciado (usando `objeto.constructor.name`).
2. **Lista de Atributos da Instância** (chaves declaradas no objeto obtidas via `Object.keys(objeto)`).
3. **Lista de Métodos da Classe** (métodos presentes no protótipo obtidos via `Object.getPrototypeOf(objeto)` e `Object.getOwnPropertyNames()`, filtrando propriedades que não sejam funções e a propriedade `'constructor'`).

**Exemplo de Saída Esperada:**
```text
=== Introspecção do Objeto ===
Classe: Produto
Atributos da Instância: nome, preco, estoque
Métodos da Classe: aplicarDesconto, exibirDetalhes
```

---

### 🔹 Parte 2: Intercepção e Manipulação Dinâmica (`DynamicUtils.ts`)

Implemente as seguintes funções utilitárias:

1. **`alterarAtributo(objeto: any, nomeAtributo: string, novoValor: any): boolean`**
   - Verifica se a propriedade `nomeAtributo` existe no objeto (`nomeAtributo in objeto`).
   - Se existir, altera o valor para `novoValor` e retorna `true`.
   - Caso contrário, exibe uma mensagem informando que a propriedade não foi encontrada e retorna `false`.

2. **`invocarMetodo(objeto: any, nomeMetodo: string, ...args: any[]): any`**
   - Verifica se a propriedade `nomeMetodo` existe no objeto ou em seu protótipo e se o tipo dela é `'function'`.
   - Se for uma função válida, executa o método passando os argumentos `...args` e retorna seu resultado.
   - Se não for uma função, exibe uma mensagem de aviso e retorna `undefined`.

---

### 🔹 Parte 3: O Desafio do Duck Typing (Superando Limites de Herança)

Nesta etapa, simularemos um cenário real onde o sistema precisa processar dados financeiros/descontos em objetos de fontes diversas.

#### 1. Crie as seguintes classes:

- **`ItemSistema` (Classe Abstrata Base)**:
  - Propriedades: `public titulo: string`, `public preco: number`.
  - Construtor para inicializar as propriedades.

- **`Produto` (Subclasse de `ItemSistema`)**:
  - Herda de `ItemSistema`.
  - Propriedade própria: `public categoria: string`.
  - Método `aplicarDesconto(porcentagem: number): void` que reduz o `preco` em X%.

- **`ItemTerceiros` (Classe de Biblioteca Externa / Código Legado)**:
  - **NÃO estende `ItemSistema`** (simulando um pacote vindo do `npm` do qual não temos acesso ao código-fonte).
  - Propriedades: `public preco: number`, `public fornecedor: string`.
  - Método `aplicarDesconto(porcentagem: number): void` que reduz o `preco` em X%.

- **`RelatorioLog` (Classe Incompatível)**:
  - Propriedades: `public data: string`, `public mensagem: string`.
  - **Não possui** `preco` nem `aplicarDesconto`.

#### 2. Implemente a função `processarReajusteUniversal(objeto: any, percentualDesconto: number): void`

A função deve usar **Reflexão / Duck Typing** para processar qualquer objeto recebido:
- Se o objeto tiver a propriedade `'preco'` (verificada via `'preco' in objeto`):
  - Exibe o preço atual.
  - Se o objeto possuir o método `'aplicarDesconto'` executável, invoca-o dinamicamente.
  - Caso contrário, altera a propriedade `'preco'` diretamente via reflexão reduzindo o valor com base no percentual.
  - Exibe o novo preço atualizado.
- Se o objeto **NÃO** possuir a propriedade `'preco'`, exibe a mensagem: `"[Aviso] O objeto da classe <NomeDaClasse> não é compatível com reajuste de preços."`.

> 💡 **Nota Didática**: Observe que a função deve funcionar tanto para `Produto` quanto para `ItemTerceiros`, comprovando que a Reflexão funciona independentemente da hierarquia de classes (`extends`).

---

### 🔹 Parte 4: Segurança de Tipos com Custom Type Guard (`TypeGuards.ts`)

Crie uma Interface e uma função Type Guard para permitir que o compilador do TypeScript reconheça objetos precificáveis sem o uso desmedido de `as any`:

1. **Interface `Precificavel`**:
   ```typescript
   export interface Precificavel {
       preco: number;
       aplicarDesconto?: (porcentagem: number) => void;
   }
   ```

2. **Função Type Guard `isPrecificavel(obj: any): obj is Precificavel`**:
   - Retorna `true` se `obj` for um objeto não nulo e contiver a propriedade `'preco'` do tipo `'number'`.

3. **Demonstração**:
   - Crie uma função de teste que receba `obj: unknown`, utilize `if (isPrecificavel(obj))` e exiba `obj.preco` com autocomplete/type checking seguro ativado pelo TypeScript.

---

## 🧪 Script de Teste / Execução Principal

Crie um arquivo de teste (ex: `src/exercicio01/index.ts` ou `src/exercicio01/TesteExercicio.ts`) que instancie:
1. Um `Produto` (`"Notebook"`, `5000`, `"Eletrônicos"`).
2. Um `ItemTerceiros` (`400`, `"Distribuidora XYZ"`).
3. Um `RelatorioLog` (`"2026-08-25"`, `"Sistema iniciado"`).

E execute todas as funções desenvolvidas nas Partes 1, 2, 3 e 4, exibindo os resultados organizados no terminal.

---

## ✅ Critérios de Avaliação

- [ ] Uso correto de APIs de reflexão do JS (`Object.getPrototypeOf`, `Object.getOwnPropertyNames`, `Object.keys`).
- [ ] Filtragem adequada da propriedade `constructor` na listagem de métodos.
- [ ] Invocação dinâmica de métodos e alteração dinâmica de atributos com notação de colchetes.
- [ ] Funcionamento do `processarReajusteUniversal` para `ItemTerceiros` (Duck Typing sem herança).
- [ ] Implementação e uso correto do Type Guard `isPrecificavel` em TypeScript.
- [ ] Código limpo, organizado e comentado didaticamente.
