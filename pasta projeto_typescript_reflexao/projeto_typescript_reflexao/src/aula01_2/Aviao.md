# Aviao.ts - Subclasse Herdeira de Coisa

O arquivo [`Aviao.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/Aviao.ts) define a classe `Aviao`, que também estende a classe abstrata `Coisa`.

---

## 📄 Código-Fonte

```typescript
import { Coisa } from "./Coisa";

export class Aviao extends Coisa {
    public companhia: string;

    constructor(cor: string, companhia: string) {
        super(cor);
        this.companhia = companhia;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Polimorfismo por Herança
Como `Aviao` e `Carro` compartilham a mesma classe pai `Coisa`, ambos herdam a propriedade `cor` e podem ser tratados sob o mesmo tipo estático em funções orientadas a objetos.

### 2. Presença do Atributo no Runtime
Ao instanciar `new Aviao("Branco", "Embraer")`, a instância resultante possuirá a chave `cor` e `companhia`. O teste de reflexão `'cor' in instancia` retornará `true`.
