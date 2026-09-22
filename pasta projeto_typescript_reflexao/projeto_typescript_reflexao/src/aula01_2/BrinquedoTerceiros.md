# BrinquedoTerceiros.ts - Classe Externa sem Herança (Caso de Uso de Reflexão)

O arquivo [`BrinquedoTerceiros.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_2/BrinquedoTerceiros.ts) simula uma classe vinda de uma biblioteca de terceiros ou sistema legado sobre o qual **não temos permissão para alterar o código-fonte**.

---

## 📄 Código-Fonte

```typescript
// Classe simulando uma biblioteca de terceiros (sem acesso ao código fonte)
// Ela possui a propriedade 'cor', mas NÃO estende 'Coisa' nem implementa interfaces do nosso projeto.
export class BrinquedoTerceiros {
    public cor: string;
    public material: string;

    constructor(cor: string, material: string) {
        this.cor = cor;
        this.material = material;
    }
}
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Por que este exemplo é fundamental?
Em projetos reais, frequentemente consumimos bibliotecas externas (via `npm`) ou códigos legados. 
- A classe `BrinquedoTerceiros` possui a propriedade `cor`.
- No entanto, ela **não estende `Coisa`**.
- Como ela vem de um pacote externo compilado, **não podemos editar seu arquivo para adicionar `extends Coisa`**.

### 2. A Falha do Polimorfismo Estático
Se tentarmos passar uma instância de `BrinquedoTerceiros` para uma função que aceita apenas `Coisa`:
```typescript
function pintar(item: Coisa) { item.cor = "Azul"; }
pintar(new BrinquedoTerceiros("Amarelo", "Plástico")); // ERRO DE COMPILAÇÃO!
```
O compilador TypeScript recusa o objeto porque ele não tem parentesco com `Coisa`.

### 3. O Sucesso da Reflexão (Duck Typing)
Com reflexão em runtime (`'cor' in instancia`):
- O JavaScript inspeciona se o objeto contém a chave `'cor'` independentemente de quem é sua classe pai.
- Como `'cor' in instancia` retorna `true`, a cor é alterada com sucesso!
- **Conclusão**: A reflexão permite tratar objetos de forma polimórfica mesmo quando a hierarquia de tipos estática do sistema falha ou é inacessível.
