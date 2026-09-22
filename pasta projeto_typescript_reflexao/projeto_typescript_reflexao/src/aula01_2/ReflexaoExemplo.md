# ReflexaoExemplo.ts - Introspecção Dinâmica e Fábrica de Construtores

O arquivo [`ReflexaoExemplo.ts`](src/aula01_2/ReflexaoExemplo.ts) é o ponto de entrada que consolida os conceitos de instanciação dinâmica, carregamento dinâmico de módulos (sem import estático) e reflexão sobre objetos de diferentes origens.

---

## 📄 Código-Fonte

```typescript
import { Carro } from "./Carro";
import { Aviao } from "./Aviao";
import { Sucata } from "./Sucata";
import { BrinquedoTerceiros } from "./BrinquedoTerceiros";
import { lerEntrada } from "../utils/leitura";

// Mapa dinâmico de construtores de classes registrados inicialmente
const classesMap: { [key: string]: any } = {
    "Carro": Carro,
    "Aviao": Aviao,
    "Sucata": Sucata,
    "BrinquedoTerceiros": BrinquedoTerceiros
};

function processarObjeto(nomeClasse: string) {
    const Construtor = classesMap[nomeClasse];
    if (!Construtor) {
        console.log(`\n----------------------------------------`);
        console.log(`Classe ${nomeClasse} não encontrada no classesMap.`);
        return;
    }

    // Instancia passando parâmetros genéricos
    const instancia = new Construtor("Vermelho", "Genérico");

    console.log(`\n----------------------------------------`);
    console.log(`Processando instância de: ${instancia.constructor.name}`);

    if ('cor' in instancia) {
        console.log(`[Reflexão] Atributo 'cor' encontrado!`);
        console.log(`Cor original: ${(instancia as any).cor}`);
        (instancia as any).cor = "Azul (Modificado via Reflexão/Dinâmica)";
        console.log(`Cor nova: ${(instancia as any).cor}`);
    } else {
        console.log("[Reflexão] Este objeto NÃO possui o atributo 'cor'.");
        if (instancia instanceof Sucata) {
            console.log(`Objeto: ${instancia}, ${instancia.peso}`);
        }
    }
}

async function main() {
    // Leitura via terminal para carregar e adicionar uma nova classe dinamicamente ao classesMap em tempo de execução
    const nomeClasseDig = await lerEntrada("Digite o nome da classe para carregar e registrar dinamicamente (ex: Suv): ");

    if (nomeClasseDig) {
        try {
            // Importação/Carregamento dinâmico sem import estático prévio no arquivo
            const modulo = require(`./${nomeClasseDig}`);
            const ConstrutorDinamico = modulo[nomeClasseDig];

            if (ConstrutorDinamico) {
                classesMap[nomeClasseDig] = ConstrutorDinamico;
                console.log(`[Registro Dinâmico] Módulo './${nomeClasseDig}' carregado e classe '${nomeClasseDig}' adicionada ao classesMap!`);
            } else {
                console.log(`[Registro Dinâmico] Módulo './${nomeClasseDig}' encontrado, mas a classe '${nomeClasseDig}' não foi exportada.`);
            }
        } catch (error) {
            console.log(`[Registro Dinâmico] Não foi possível carregar o módulo './${nomeClasseDig}'.`);
        }
    }

    // Iterando dinamicamente sobre todas as classes registradas no classesMap:
    Object.keys(classesMap).forEach((nomeClasse) => {
        processarObjeto(nomeClasse);
    });

    /*
    // Chamada manual mantida para referência futura:
    if (nomeClasseDig) {
        processarObjeto(nomeClasseDig);
    }
    processarObjeto("Carro");
    processarObjeto("Aviao");
    processarObjeto("Sucata");
    processarObjeto("BrinquedoTerceiros");
    */
}

main();
```

---

## 🖥️ Saída de Exemplo da Execução (`pnpm run aula01_2:reflexao`)

```text
Digite o nome da classe para carregar e registrar dinamicamente (ex: Suv): Suv
[Registro Dinâmico] Módulo './Suv' carregado e classe 'Suv' adicionada ao classesMap!

----------------------------------------
Processando instância de: Carro
[Reflexão] Atributo 'cor' encontrado!
Cor original: Vermelho
Cor nova: Azul (Modificado via Reflexão/Dinâmica)

----------------------------------------
Processando instância de: Aviao
[Reflexão] Atributo 'cor' encontrado!
Cor original: Vermelho
Cor nova: Azul (Modificado via Reflexão/Dinâmica)

----------------------------------------
Processando instância de: Sucata
[Reflexão] Este objeto NÃO possui o atributo 'cor'.
Objeto: [object Object], Vermelho

----------------------------------------
Processando instância de: BrinquedoTerceiros
[Reflexão] Atributo 'cor' encontrado!
Cor original: Vermelho
Cor nova: Azul (Modificado via Reflexão/Dinâmica)

----------------------------------------
Processando instância de: Suv
[Reflexão] Atributo 'cor' encontrado!
Cor original: Vermelho
Cor nova: Azul (Modificado via Reflexão/Dinâmica)
```

---

## 🧠 Conceitos e Explicação Didática

### 1. Iteração Dinâmica com `Object.keys(classesMap)`
Ao iterar sobre `Object.keys(classesMap)`, todas as classes (tanto as originalmente registradas quanto a nova classe adicionada dinamicamente via `require`) são processadas automaticamente sem necessidade de chamadas manuais para cada uma.

### 2. Carregamento Dinâmico de Módulos (`require('./' + nomeClasse)`)
- O arquivo [`ReflexaoExemplo.ts`](src/aula01_2/ReflexaoExemplo.ts) **NÃO possui o import estático** da classe `Suv`.
- Em tempo de execução, o script recebe o nome da classe (ex: `"Suv"`), carrega dinamicamente o arquivo `./Suv.ts` via `require`, recupera o construtor exportado e registra-o no `classesMap`.
