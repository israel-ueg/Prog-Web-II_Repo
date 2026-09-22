# ObjectWithColor.ts - Interface e Type Guard

O arquivo [`ObjectWithColor.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/ObjectWithColor.ts) contém a declaração da Interface e da função de afunilamento de tipo (*Type Guard*).

---

## 📄 Código-Fonte

```typescript
export interface ObjectWithColor {
    cor: string;
}

// Type Guard para verificar em tempo de execução
export function isObjectWithColor(obj: any): obj is ObjectWithColor {
    return typeof obj === 'object' && obj !== null && 'cor' in obj;
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Interface em TypeScript
A interface `ObjectWithColor` exige apenas que o objeto implemente uma propriedade pública `cor: string`. Ela serve para garantir o polimorfismo estrutural em tempo de compilação.

### 2. O Predicado de Tipo `obj is ObjectWithColor`
Como a interface desaparece ao ser compilada para JavaScript (*Type Erasure*), a função `isObjectWithColor` realiza uma verificação reflexiva em tempo de execução (`'cor' in obj`).

O tipo de retorno `obj is ObjectWithColor` é um recurso exclusivo do TypeScript chamado **Custom Type Guard**:
- Quando a função retorna `true`, o TypeScript entende que a variável `obj` é do tipo `ObjectWithColor` no escopo interno do `if`.
- Isso restaura o autocomplete e a checagem de tipos estática do TypeScript sem precisar usar `as any` dentro do bloco condicional!
