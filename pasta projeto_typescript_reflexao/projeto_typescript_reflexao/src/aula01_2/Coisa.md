# Coisa.ts - Classe Abstrata Base

O arquivo [`Coisa.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/Coisa.ts) define a classe abstrata base usada na hierarquia tradicional de herança.

---

## 📄 Código-Fonte

```typescript
export abstract class Coisa {
    public cor: string;

    constructor(cor: string) {
        this.cor = cor;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. O Papel das Classes Abstratas (`abstract class`)
- Uma classe marcada como `abstract` não pode ser instanciada diretamente (não é possível fazer `new Coisa()`).
- Ela serve como um modelo contratual de herança para garantir que todas as subclasses (como `Carro` e `Aviao`) tenham a propriedade `cor`.

### 2. O Polimorfismo Estático Baseado em Herança
Em linguagens fortemente tipadas, se criarmos uma função `processarCoisa(item: Coisa)`, o compilador aceitará instâncias de `Carro` e `Aviao` porque ambas derivam de `Coisa`.

### 3. A Limitação
Se tivermos um objeto de uma biblioteca de terceiros que possui a propriedade `cor`, mas **não estende `Coisa`**, a função estática `processarCoisa(item: Coisa)` irá rejeitá-lo no momento da compilação.
