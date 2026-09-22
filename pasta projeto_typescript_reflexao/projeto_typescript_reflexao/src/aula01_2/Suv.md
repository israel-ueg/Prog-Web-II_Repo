# Suv.ts - Subclasse Herdeira de Coisa para Teste de Registro Dinâmico

O arquivo [`Suv.ts`](src/aula01_2/Suv.ts) define a classe `Suv`, que estende a classe abstrata `Coisa`. Esta classe possui o atributo `subcategoria` (ex: "Compacto", "Médio", "Grande") e é utilizada para demonstrar a adição dinâmica de um construtor ao mapa de classes (`classesMap`) em tempo de execução.

---

## 📄 Código-Fonte

```typescript
import { Coisa } from "./Coisa";

export class Suv extends Coisa {
    public subcategoria: string;

    constructor(cor: string, subcategoria: string) {
        super(cor);
        this.subcategoria = subcategoria;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Herança em TypeScript (`extends` e `super`)
- `Suv extends Coisa`: Indica herança. `Suv` herda o atributo `cor` de `Coisa` e possui sua propriedade específica `subcategoria`.
- `super(cor)`: Chama o construtor da classe pai `Coisa` para inicializar a propriedade `cor`.

### 2. Registro Dinâmico em Runtime
A classe `Suv` inicialmente **não** faz parte do `classesMap`. Durante a execução do script [`ReflexaoExemplo.ts`](src/aula01_2/ReflexaoExemplo.ts), a classe é adicionada dinamicamente ao mapa através da leitura via terminal, demonstrando o registro e instanciação dinâmica.
