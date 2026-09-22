# ReflexaoExemplo.ts - Testando Type Guard de Interface

O arquivo [`ReflexaoExemplo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ReflexaoExemplo.ts) demonstra o uso do Type Guard em um cenário de verificação de interface em runtime.

---

## 📄 Código-Fonte

```typescript
import { Carro } from "./Carro";
import { isObjectWithColor } from "./ObjectWithColor";

const meuCarro = new Carro("Prata", "Sedan");

console.log("--- Testando Interfaces em TypeScript ---");
// Interfaces em TS não existem no runtime (type erasure).
// Usamos Type Guards (isObjectWithColor) para verificar a aderência estrutural do objeto.

if (isObjectWithColor(meuCarro)) {
    console.log("O objeto implementa a estrutura de ObjectWithColor.");
    console.log(`A cor é: ${meuCarro.cor}`);
}
```

---

## 🖥️ Saída da Execução (`pnpm run aula01_2:interface`)

```text
--- Testando Interfaces em TypeScript ---
O objeto implementa a estrutura de ObjectWithColor.
A cor é: Prata
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Checagem Estrutural via Type Guard
Dentro da condicional `if (isObjectWithColor(meuCarro))`, a chamada da função executa `'cor' in meuCarro`. 

Como a função possui o tipo de retorno `obj is ObjectWithColor`:
- Dentro do bloco `if`, a expressão `meuCarro.cor` é reconhecida **diretamente pelo TypeScript** com autocompletion e checagem de tipos estática segura, **sem precisar usar `as any`**.
- Unimos a flexibilidade da verificação reflexiva em tempo de execução com a segurança de tipos do TypeScript!
