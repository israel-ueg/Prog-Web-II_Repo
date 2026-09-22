# Ex4Constructor.ts - Funções Construtoras e Instanciação Dinâmica

O arquivo [`Ex4Constructor.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex4Constructor.ts) ilustra como referenciar classes como valores e criar instâncias de forma dinâmica.

---

## 📄 Código-Fonte

```typescript
import { Ex3Classe } from "./Ex3Classe";

console.log("--- Construtores em TypeScript ---");
// Em JS/TS, as classes são funções construtoras ("first-class citizens")
const construtorReferencia = Ex3Classe;

// Instanciando dinamicamente
const novaInstancia = new construtorReferencia("Instância Dinâmica", 25);
console.log("Nome:", novaInstancia.nome);
```

---

## 🖥️ Saída da Execução

```text
--- Construtores em TypeScript ---
Nome: Instância Dinâmica
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Classes como Cidadãs de Primeira Classe (*First-Class Citizens*)
Em JavaScript e TypeScript, uma classe não é apenas um tipo ou uma estrutura sintática estática; ela é um valor do tipo objeto/função.
- Podemos passar classes como parâmetros para funções.
- Podemos armazenar uma referência a uma classe dentro de uma variável (`const construtorReferencia = Ex3Classe;`).
- Podemos retornar classes a partir de outras funções (Factory Pattern).

### 2. Instanciação Dinâmica
Com a referência da classe armazenada na variável `construtorReferencia`, a expressão `new construtorReferencia(...)` executa o construtor normal da classe, criando um objeto válido com todas as suas propriedades e protótipos inicializados.

> [!NOTE]
> Este padrão é essencial para o desenvolvimento de frameworks de Injeção de Dependências (como NestJS ou Angular) e rotinas de carregamento dinâmico de plugins/módulos.
