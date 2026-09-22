# Carro.ts - Subclasse Herdeira de Coisa

O arquivo [`Carro.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/Carro.ts) define a classe `Carro`, que estende a classe abstrata `Coisa`.

---

## 📄 Código-Fonte

```typescript
import { Coisa } from "./Coisa";

export class Carro extends Coisa {
    public modelo: string;

    constructor(cor: string, modelo: string) {
        super(cor);
        this.modelo = modelo;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Herança em TypeScript (`extends` e `super`)
- `Carro extends Coisa`: Indica herança. `Carro` herda o atributo `cor` de `Coisa`.
- `super(cor)`: Chama o construtor da classe pai `Coisa` para inicializar a propriedade `cor`.

### 2. Comportamento no Runtime
No JavaScript compilado, a cadeia de protótipos estabelece que `Carro.prototype.__proto__ === Coisa.prototype`. 
Isso permite que tanto o operador estático `instanceof Coisa` quanto a reflexão dinâmica `'cor' in objeto` funcionem perfeitamente.
