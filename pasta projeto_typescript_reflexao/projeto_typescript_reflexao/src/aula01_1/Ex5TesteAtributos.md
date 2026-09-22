# Ex5TesteAtributos.ts - Listando Atributos da Instância e Visibilidade em Runtime

O arquivo [`Ex5TesteAtributos.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex5TesteAtributos.ts) demonstra como inspecionar as propriedades de instância (atributos de dados) de um objeto.

---

## 📄 Código-Fonte

```typescript
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("João", 40);

console.log("--- Listando Atributos (Propriedades) ---");
// Propriedades privadas em TS (compiladas para JS) ainda são visíveis via Object.keys se inicializadas.
// Para ocultação real no runtime, usa-se o prefixo '#' (ex: #idade).
const atributos = Object.keys(objeto);
atributos.forEach(attr => console.log(attr));
```

---

## 🖥️ Saída da Execução (`pnpm run aula01_1:atributos`)

```text
--- Listando Atributos (Propriedades) ---
nome
idade
```

---

## 🧠 Conceitos e Explicação Didática

### 1. `Object.keys(objeto)` vs `Object.getOwnPropertyNames(prototipo)`
- **`Object.keys(objeto)`**: Retorna um array com os nomes de todas as propriedades enumeráveis **da própria instância do objeto** (os valores atribuídos no construtor como `nome` e `idade`). Não inclui os métodos da classe, pois estes residem no protótipo.
- **`Object.getOwnPropertyNames(prototipo)`**: Retorna as propriedades declaradas no protótipo (métodos e construtor).

### 2. Visibilidade `private` no TypeScript vs JavaScript
Repare que o atributo `idade` foi declarado como `private` na classe [`Ex3Classe.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex3Classe.ts), mas foi listado normalmente pelo `Object.keys(objeto)`.

- **`private` em TypeScript**: Ocorre em nível de compilação. Se você tentar escrever `objeto.idade` em código TypeScript, o compilador emitirá um erro. Porém, ao compilar para JavaScript, o modificador `private` é removido e a propriedade se torna uma chave pública normal no objeto JS em runtime.
- **Private Fields nativos do JavaScript (`#idade`)**: Para garantir que a propriedade permaneça oculta e inacessível mesmo via `Object.keys()` ou reflexão em tempo de execução, a especificação moderna do ECMAScript utiliza a sintaxe `#atributo` (ex: `#idade`).
