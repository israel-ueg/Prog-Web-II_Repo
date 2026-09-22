# Ex2ReflexaoVerificaClasseObjeto.ts - Verificação de Classe e Tipo em Tempo de Execução

O arquivo [`Ex2ReflexaoVerificaClasseObjeto.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex2ReflexaoVerificaClasseObjeto.ts) demonstra técnicas de introspecção para checar o tipo de um objeto em tempo de execução (*runtime*).

---

## 📄 Código-Fonte

```typescript
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("Teste", 30);

console.log("--- Verificação de Classe ---");
console.log("O objeto é instância de Ex3Classe?", objeto instanceof Ex3Classe);
console.log("Nome da classe do construtor:", objeto.constructor.name);
```

---

## 🖥️ Saída da Execução (`pnpm run aula01_1:verificaClasse`)

```text
--- Verificação de Classe ---
O objeto é instância de Ex3Classe? true
Nome da classe do construtor: Ex3Classe
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Operador `instanceof`
O operador `objeto instanceof Classe` testa se o protótipo da `Classe` aparece em qualquer lugar da cadeia de protótipos (*prototype chain*) do `objeto`.
- Retorna `true` se o objeto tiver sido criado a partir daquela classe (ou de uma subclasse dela).
- Útil para validação de tipos dinâmicos e checagem de polimorfismo.

### 2. Identificação da Classe via `objeto.constructor.name`
Todo objeto em JavaScript herda a propriedade `constructor` de seu protótipo.
- `objeto.constructor` referencia a função construtora (a própria classe).
- `objeto.constructor.name` retorna o nome da classe em formato de `string` (neste exemplo, `"Ex3Classe"`).

> [!TIP]
> Descobrir o nome da classe como string via `constructor.name` possibilita criar rotinas de geração de logs, serialização de objetos ou registro dinâmico em injetores de dependência.
