# Ex6InvocaMetodo.ts - Invocação Dinâmica de Métodos por String

O arquivo [`Ex6InvocaMetodo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex6InvocaMetodo.ts) demonstra como chamar um método de um objeto quando o seu nome é conhecido apenas em formato de string durante a execução.

---

## 📄 Código-Fonte

```typescript
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("Maria", 28);
const nomeMetodo = "falar";

console.log("--- Invocando Método Dinamicamente ---");
if (typeof (objeto as any)[nomeMetodo] === 'function') {
    (objeto as any)[nomeMetodo]();
} else {
    console.log(`Método ${nomeMetodo} não encontrado.`);
}
```

---

## 🖥️ Saída da Execução (`pnpm run aula01_1:invocaMetodo`)

```text
--- Invocando Método Dinamicamente ---
Olá, meu nome é Maria
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Acesso via Notação de Colchetes `objeto[chave]`
Em JavaScript, membros de objetos podem ser acessados de duas formas:
1. Notação de ponto estática: `objeto.falar()`
2. Notação de colchetes dinâmica: `objeto["falar"]()`

A notação de colchetes permite que o nome da propriedade ou método venha de uma variável dinâmica (ex: entrada de um usuário, parâmetro de API ou configuração JSON).

### 2. O papel do `(objeto as any)` no TypeScript
O compilador do TypeScript é altamente rigoroso com a segurança de tipos. Se tentarmos fazer `objeto[nomeMetodo]()` onde `nomeMetodo` é do tipo `string`, o TypeScript emitirá o erro:
`Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Ex3Classe'`.

Para instruir o compilador a ignorar a verificação estrita para este caso de reflexão, fazemos a coerção `(objeto as any)`.

### 3. Validação antes da Execução (`typeof === 'function'`)
Para evitar erros de execução do tipo `TypeError: objeto[nomeMetodo] is not a function`, sempre validamos com `typeof (objeto as any)[nomeMetodo] === 'function'` antes de efetuar a chamada `()`.
