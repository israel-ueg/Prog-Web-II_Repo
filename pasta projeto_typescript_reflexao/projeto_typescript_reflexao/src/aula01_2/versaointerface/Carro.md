# Carro.ts - Classe Implementando Interface

O arquivo [`Carro.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/versaointerface/Carro.ts) define a classe `Carro` que implementa a interface `ObjectWithColor`.

---

## 📄 Código-Fonte

```typescript
import { ObjectWithColor } from "./ObjectWithColor";

export class Carro implements ObjectWithColor {
    public cor: string;
    public modelo: string;

    constructor(cor: string, modelo: string) {
        this.cor = cor;
        this.modelo = modelo;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. A Cláusula `implements ObjectWithColor`
O uso de `implements ObjectWithColor` força o compilador do TypeScript a verificar se a classe `Carro` possui a propriedade `cor: string`. 

### 2. O que muda no JavaScript compilado?
Absolutamente nada referente à interface! A cláusula `implements ObjectWithColor` é completamente **removida** pelo compilador. No JS final, resta apenas a classe normal com suas propriedades `cor` e `modelo`.
