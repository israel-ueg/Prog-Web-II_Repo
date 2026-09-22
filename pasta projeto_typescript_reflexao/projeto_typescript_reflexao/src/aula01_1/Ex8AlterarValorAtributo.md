# Ex8AlterarValorAtributo.ts - Alterando Valores de Atributos Dinamicamente

O arquivo [`Ex8AlterarValorAtributo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex8AlterarValorAtributo.md) demonstra a alteração reflexiva/dinâmica do valor de uma propriedade de um objeto através de seu nome em formato de string.

---

## 📄 Código-Fonte

```typescript
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("Carlos", 50);

console.log("--- Alterando Valor Dinamicamente ---");
console.log("Antes:", objeto.nome);

const atributoParaAlterar = "nome";
(objeto as any)[atributoParaAlterar] = "Carlos Silva";

console.log("Depois:", objeto.nome);
```

---

## 🖥️ Saída da Execução

```text
--- Alterando Valor Dinamicamente ---
Antes: Carlos
Depois: Carlos Silva
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Atribuição Dinâmica de Valores
Assim como a leitura e a invocação, a **atribuição de valores** em JavaScript pode ser realizada de forma dinâmica via notação de colchetes:
```typescript
(objeto as any)[atributoParaAlterar] = "Carlos Silva";
```
Isso altera o valor armazenado na propriedade `"nome"` da instância de `"Carlos"` para `"Carlos Silva"`.

### 2. Casos de Uso no Desenvolvimento de Software
A alteração dinâmica de atributos via reflexão é a base para o funcionamento de:
- **Serializadores / Deserializadores JSON**: Preenchimento automático de propriedades em DTOs (Data Transfer Objects).
- **ORMs (Object-Relational Mappers)** (ex: TypeORM, Prisma, Hibernate): Mapeamento automático de colunas do banco de dados para propriedades da classe.
- **Form Bindings em Frameworks Front-end**: Atualização dinâmica do estado do objeto quando um campo de formulário HTML é alterado.
- **Hydration / State Restoration**: Recomposição do estado interno de entidades a partir de um payload persistido.
