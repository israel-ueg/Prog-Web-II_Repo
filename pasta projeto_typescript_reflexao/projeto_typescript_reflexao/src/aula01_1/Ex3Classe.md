# Ex3Classe.ts - Classe de Exemplo

O arquivo [`Ex3Classe.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex3Classe.ts) fornece a estrutura base utilizada por todos os outros exemplos da aula.

---

## 📄 Código-Fonte

```typescript
export class Ex3Classe {
    public nome: string;
    private idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    public falar(): void {
        console.log(`Olá, meu nome é ${this.nome}`);
    }

    private metodoPrivado(): void {
        console.log("Este é um método privado");
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Visibilidade em TypeScript (`public` e `private`)
- **`public`**: A propriedade `nome` e o método `falar()` podem ser acessados livremente tanto por código TypeScript compilado quanto em runtime.
- **`private`**: A propriedade `idade` e o método `metodoPrivado()` são restritos pelo **compilador do TypeScript**. 

### 2. O que acontece após a compilação para JavaScript?
Em JavaScript (ES6+), os modificadores `public` e `private` do TypeScript são **removidos** (*Type Erasure*). 

- Os métodos `falar()` e `metodoPrivado()` são anexados diretamente ao protótipo da classe (`Ex3Classe.prototype`).
- Em tempo de execução (*runtime*), JavaScript **não impede** o acesso ou chamada de `metodoPrivado()` ou `idade` via reflexão (a menos que sejam utilizados os Private Fields do ES `#idade`).
