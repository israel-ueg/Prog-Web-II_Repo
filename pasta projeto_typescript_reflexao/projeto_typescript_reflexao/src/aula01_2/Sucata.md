# Sucata.ts - Classe Isolada sem Atributo Alvo

O arquivo [`Sucata.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/Sucata.ts) define uma classe que **não** possui a propriedade `cor`.

---

## 📄 Código-Fonte

```typescript
export class Sucata {
    public peso: number;

    constructor(peso: number) {
        this.peso = peso;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Teste Negativo de Introspecção em Runtime
A classe `Sucata` foi criada para demonstrar como o mecanismo de reflexão responde quando uma propriedade pesquisada **não existe** no objeto.

- Ao executar `'cor' in instancia` sobre um objeto `Sucata`, a expressão avalia para `false`.
- Isso evita exceções e *runtime errors* como `TypeError: Cannot read property of undefined`, permitindo tratar o caso no bloco `else`.
