# Aula 01.2 (Versão Interface): Polimorfismo via Interfaces e Type Guards em TypeScript

Este diretório contém a implementação alternativa focada em **Interfaces estáticas** e **Type Guards** de TypeScript.

---

## 📌 O Conceito de Type Erasure (Apagamento de Tipos)

No TypeScript, uma **Interface** (como [`ObjectWithColor`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ObjectWithColor.ts)) é um contrato de tempo de compilação.

- Quando o arquivo `.ts` é compilado para JavaScript, **a interface é totalmente apagada** do código gerado (*Type Erasure*).
- No JavaScript final em runtime, a interface não existe mais como objeto ou valor.
- Por essa razão, **não é possível fazer `objeto instanceof ObjectWithColor`** em tempo de execução.

---

## 💡 A Solução com Type Guards (Introspecção de Tipos em Runtime)

Para contornar o apagamento de tipos e verificar em runtime se um objeto respeita o formato esperado pela interface, criamos uma função **Type Guard**:

```typescript
export function isObjectWithColor(obj: any): obj is ObjectWithColor {
    return typeof obj === 'object' && obj !== null && 'cor' in obj;
}
```

- A função utiliza introspecção/reflexão (`'cor' in obj`) para checar a presença do atributo.
- O tipo de retorno de predicado `obj is ObjectWithColor` informa ao compilador TypeScript que, dentro do bloco `if`, o objeto pode ser tratado com segurança como `ObjectWithColor`.

---

## 📂 Arquivos da Subpasta

| Arquivo TypeScript | Documentação Didática | Papel no Exemplo |
| :--- | :--- | :--- |
| [`ObjectWithColor.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ObjectWithColor.ts) | [`ObjectWithColor.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ObjectWithColor.md) | Declaração da Interface e da função Type Guard `isObjectWithColor`. |
| [`Carro.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/Carro.ts) | [`Carro.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/Carro.md) | Classe `Carro` implementando a interface `ObjectWithColor`. |
| [`ReflexaoExemplo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ReflexaoExemplo.ts) | [`ReflexaoExemplo.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ReflexaoExemplo.md) | Script de teste verificando a conformidade estrutural via Type Guard. |
