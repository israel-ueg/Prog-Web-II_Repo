# Aula 01.2: Polimorfismo Tradicional vs Reflexão em TypeScript / JavaScript

Este diretório contém os exemplos práticos sobre as diferenças entre os mecanismos estáticos de **Polimorfismo (Herança e Interfaces)** e o uso de **Reflexão (Duck Typing, Introspecção Dinâmica e Registro Dinâmico de Classes)** para superar limitações de código legado ou de terceiros.

---

## 📌 O Problema Didático: Limitações do Polimorfismo Tradicional

No desenvolvimento orientado a objetos tradicional:
- Para tratar diferentes objetos de maneira polimórfica (ex: alterar a cor ou invocar um método), exige-se que as classes compartilhem uma **Classe Base comum** (`extends Coisa`) ou implementem uma **Interface estática** (`implements ObjectWithColor`).

### ❓ E quando utilizamos código de terceiros ou bibliotecas externas?
Imagine que você importe uma classe de uma biblioteca de terceiros ou um sistema legado (como a classe [`BrinquedoTerceiros.ts`](BrinquedoTerceiros.ts)).
- Essa classe **possui** a propriedade `cor`, mas **NÃO estende** `Coisa` e **NÃO implementa** `ObjectWithColor`.
- Como não temos acesso ao código-fonte da biblioteca para alterá-la, o polimorfismo estático por herança ou por interface estrita **falha** ou impede a compilação no TypeScript!

---

## 💡 A Solução via Reflexão (Duck Typing e Registro Dinâmico em Runtime)

A **Reflexão** nos permite inspecionar o objeto em tempo de execução (*runtime*), verificando a existência de propriedades ou métodos diretamente no objeto (conceito conhecido como *Duck Typing*: *"se anda como pato e faz quack como pato, é um pato"*).

Com o operador `'cor' in instancia` e coerção dinâmica `(instancia as any).cor`:
- Conseguimos manipular `Carro`, `Aviao` e `Suv` (que herdaram de `Coisa`).
- **Conseguimos registrar novas classes dinamicamente via terminal** (como a classe [`Suv.ts`](Suv.ts)) no mapa de construtores (`classesMap`).
- **E conseguimos manipular `BrinquedoTerceiros`** (que não tem parentesco nem interface comum com as outras classes)!
- Rejeitamos com segurança objetos que não possuem o atributo target (como a classe [`Sucata.ts`](Sucata.ts)).

---

## 🔬 Apagamento de Tipos (*Type Erasure*) de Interfaces no TypeScript

Na subpasta [`versaointerface/`](versaointerface):
- Em linguagens como Java e C#, interfaces permanecem registradas no runtime e podem ser verificadas com `obj instanceof MinhaInterface`.
- Em **TypeScript**, **Interfaces não existem no JavaScript compilado** (*Type Erasure*).
- Portanto, para validar se um objeto respeita uma interface em runtime, o TypeScript recorre a **Type Guards** que utilizam introspecção/reflexão (`'cor' in obj`).

---

## 📂 Guia dos Arquivos e Exemplos

### 1. Polimorfismo e Reflexão sem Interfaces (`src/aula01_2/`)

| Arquivo TypeScript | Documentação Didática | Descrição / Papel |
| :--- | :--- | :--- |
| [`Coisa.ts`](Coisa.ts) | [`Coisa.md`](Coisa.md) | Classe abstrata base definindo o atributo `cor`. |
| [`Carro.ts`](Carro.ts) | [`Carro.md`](Carro.md) | Subclasse de `Coisa`. |
| [`Aviao.ts`](Aviao.ts) | [`Aviao.md`](Aviao.md) | Subclasse de `Coisa`. |
| [`Suv.ts`](Suv.ts) | [`Suv.md`](Suv.md) | Subclasse de `Coisa` utilizada para demonstrar registro dinâmico no `classesMap`. |
| [`Sucata.ts`](Sucata.ts) | [`Sucata.md`](Sucata.md) | Classe isolada que **não** possui o atributo `cor`. |
| [`BrinquedoTerceiros.ts`](BrinquedoTerceiros.ts) | [`BrinquedoTerceiros.md`](BrinquedoTerceiros.md) | Classe de terceiros **sem herança**, mas que **possui `cor`**. |
| [`ReflexaoExemplo.ts`](ReflexaoExemplo.ts) | [`ReflexaoExemplo.md`](ReflexaoExemplo.md) | Script de execução principal demonstrando o registro dinâmico e tratamento reflexivo universal. |

### 2. Polimorfismo via Interfaces (`src/aula01_2/versaointerface/`)

| Documentação Didática | Descrição / Papel |
| :--- | :--- |
| [`versaointerface/README.md`](versaointerface/README.md) | Guia da versão baseada em Interfaces e Type Guards. |
| [`versaointerface/ObjectWithColor.md`](versaointerface/ObjectWithColor.md) | Interface `ObjectWithColor` e função Type Guard `isObjectWithColor`. |
| [`versaointerface/Carro.md`](versaointerface/Carro.md) | Classe `Carro` implementando a interface `ObjectWithColor`. |
| [`versaointerface/ReflexaoExemplo.md`](versaointerface/ReflexaoExemplo.md) | Execução do teste de validação de interface via Type Guard em runtime. |
