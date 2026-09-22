# Ex1ReflexaoListarMetodos.ts - Listando Métodos de uma Classe via Reflexão

O arquivo [`Ex1ReflexaoListarMetodos.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex1ReflexaoListarMetodos.ts) demonstra como inspecionar o protótipo de um objeto para descobrir e listar dinamicamente todos os seus métodos.

---

## 📄 Código-Fonte

```typescript
import "reflect-metadata";
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("Teste", 30);
const prototipo = Object.getPrototypeOf(objeto);

console.log(" -- lista de todas as propriedades");
const propriedades = Object.getOwnPropertyNames(prototipo);
propriedades.forEach(prop => console.log(prop));

console.log("--- Métodos da Classe ---");
// Em TypeScript/JS, obtemos os métodos lendo as propriedades do protótipo
const metodos = Object.getOwnPropertyNames(prototipo)
    .filter(prop => typeof prototipo[prop] === 'function' && prop !== 'constructor');

metodos.forEach(metodo => console.log(metodo));
```

---

## 🖥️ Saída da Execução (`pnpm run aula01_1:listarMetodos`)

```text
 -- lista de todas as propriedades
constructor
falar
metodoPrivado
--- Métodos da Classe ---
falar
metodoPrivado
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Obtenção do Protótipo (`Object.getPrototypeOf`)
Em JavaScript, métodos declarados em uma classe não ficam armazenados diretamente no objeto de instância, mas sim no seu **protótipo** (`Ex3Classe.prototype`). 
Utilizamos `Object.getPrototypeOf(objeto)` para obter o objeto protótipo.

### 2. Por que o `constructor` é listado na primeira busca?
Por especificação da linguagem JavaScript:
- Todo objeto protótipo possui automaticamente uma propriedade chamada `constructor` que aponta de volta para a função construtora da classe (`Ex3Classe.prototype.constructor === Ex3Classe`).
- Como `Object.getOwnPropertyNames(prototipo)` busca **todas as chaves de propriedade** presentes no protótipo (sejam elas enumeráveis ou não), a propriedade `constructor` é retornada junto com `falar` e `metodoPrivado`.

### 3. Filtrando Apenas os Métodos da Classe
Para obter somente os métodos úteis criados pelo desenvolvedor:
1. Verificamos se a propriedade é executável: `typeof prototipo[prop] === 'function'`.
2. Excluímos explicitamente o construtor: `prop !== 'constructor'`.

> [!NOTE]
> Observe que até mesmo o método `metodoPrivado` é listado na introspecção. Isso ocorre porque os modificadores de acesso do TypeScript (`private`) são checados apenas no momento da compilação e não existem no runtime do JavaScript.
