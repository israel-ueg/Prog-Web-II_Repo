# Aula 01.1: Reflexão e Introspecção em TypeScript / JavaScript

Este diretório contém os exemplos práticos sobre **Reflexão (Reflection)** e **Introspecção** de objetos e classes em TypeScript e JavaScript.

---

## 📌 Conceitos Fundamentais

### O que é Reflexão?
Em programação, **Reflexão** é a capacidade que um programa tem de inspecionar, examinar e modificar sua própria estrutura e comportamento em tempo de execução (*runtime*). 

Ela se divide em dois pilares principais:
1. **Introspecção**: A habilidade de ler/examinar a estrutura de um objeto (quais atributos ele tem, quais métodos possui, qual é a sua classe/construtor).
2. **Intercepção / Modificação**: A habilidade de alterar dinamicamente o valor de atributos, invocar métodos dinamicamente por seu nome em formato de string ou instanciar classes a partir de referências guardadas em variáveis.

---

### Reflexão em TypeScript vs JavaScript

| Aspecto | TypeScript (Compile-Time) | JavaScript (Runtime) |
| :--- | :--- | :--- |
| **Tipagem** | Estática e verificada no momento da compilação. Os tipos são "apagados" (*type erasure*) ao gerar o JS. | Dinâmica. O motor do JS só conhece objetos, protótipos e valores reais. |
| **Metadados de Tipos** | Interfaces, Generics e Tipos Privados existem apenas no arquivo `.ts`. | Não existem em runtime a menos que bibliotecas de metadados (`reflect-metadata`) ou Decorators sejam utilizados. |
| **Acesso Dinâmico** | Exige coerção de tipo (ex: `(objeto as any)[nomePropriedade]`) para evitar erros do compilador. | Permitido naturally através da sintaxe de colchetes `objeto[nomePropriedade]`. |

---

## 🛠️ Principais APIs e Técnicas Utilizadas

- **`Object.getPrototypeOf(objeto)`**: Retorna o protótipo (`prototype`) associado à instância, de onde vêm os métodos declarados na classe.
- **`Object.getOwnPropertyNames(objetoOuPrototipo)`**: Lista todas as propriedades (incluindo métodos e o `constructor`) declaradas diretamente naquele objeto ou protótipo, enumeráveis ou não.
- **`Object.keys(objeto)`**: Lista as chaves de propriedades enumeráveis da instância (atributos de dados).
- **`objeto.constructor.name`**: Obtém a string com o nome da classe/função construtora da qual o objeto foi instanciado.
- **`objeto instanceof Classe`**: Verifica se a função construtora da `Classe` está presente na cadeia de protótipos do `objeto`.
- **Invocação Dinâmica `(objeto as any)[nomeMetodo]()`**: Executa um método passando seu nome como `string`.
- **Modificação Dinâmica `(objeto as any)[atributo] = novoValor`**: Altera a propriedade de um objeto de maneira dinâmica.

---

## 📂 Guia dos Exemplos

Abaixo estão os exemplos disponíveis nesta aula com seus respectivos guias didáticos:

| Arquivo TypeScript | Documentação Didática | Conceito Demonstrado |
| :--- | :--- | :--- |
| [`Ex3Classe.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex3Classe.ts) | [`Ex3Classe.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex3Classe.md) | Classe modelo com atributos públicos/privados e métodos. |
| [`Ex1ReflexaoListarMetodos.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex1ReflexaoListarMetodos.ts) | [`Ex1ReflexaoListarMetodos.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex1ReflexaoListarMetodos.md) | Inspeção de protótipos e listagem de métodos de uma classe. |
| [`Ex2ReflexaoVerificaClasseObjeto.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex2ReflexaoVerificaClasseObjeto.ts) | [`Ex2ReflexaoVerificaClasseObjeto.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex2ReflexaoVerificaClasseObjeto.md) | Identificação do tipo da classe via `instanceof` e `constructor.name`. |
| [`Ex4Constructor.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex4Constructor.md) | [`Ex4Constructor.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex4Constructor.md) | Tratamento de classes como funções de primeira classe e instanciação dinâmica. |
| [`Ex5TesteAtributos.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex5TesteAtributos.md) | [`Ex5TesteAtributos.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex5TesteAtributos.md) | Introspecção de atributos da instância e visibilidade pós-compilação. |
| [`Ex6InvocaMetodo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex6InvocaMetodo.md) | [`Ex6InvocaMetodo.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex6InvocaMetodo.md) | Invocação dinâmica de métodos por string. |
| [`Ex8AlterarValorAtributo.ts`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex8AlterarValorAtributo.md) | [`Ex8AlterarValorAtributo.md`](file:///home/guiliano/Dropbox/UEG/2026/20262/Program%C3%A7%C3%A3o%20WEB%20II/1VA/reflexao-typescript/projeto_typescript_reflexao/src/aula01_1/Ex8AlterarValorAtributo.md) | Leitura e alteração dinâmica de valores de atributos. |

---

## ⚠️ Boas Práticas e Cuidados ao Usar Reflexão

1. **Perda da Segurança de Tipos**: Ao usar `as any` ou acessar propriedades por string, o compilador do TypeScript deixa de checar erros de digitação e incompatibilidades de tipo.
2. **Encapsulamento**: Modificadores `private` de TypeScript não impedem a leitura ou alteração reflexiva no JavaScript compilado. Se for necessário ocultamento estrito em tempo de execução, utilize Private Fields nativos do JS (`#atributo`).
3. **Manutenibilidade**: A reflexão deve ser usada com moderação, sendo ideal para desenvolvimento de frameworks, ORMs, serializadores JSON, injeção de dependências e roteadores dinâmicos.
