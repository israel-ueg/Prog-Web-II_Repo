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

    // Checagem 1: Polimorfismo estático tradicional (Herança)
    // Funciona apenas se a classe herda explicitamente de 'Coisa'
    // 'BrinquedoTerceiros' NÃO herda de 'Coisa', logo falharia no polimorfismo estático.

    // Checagem 2: Reflexão / Duck Typing em Runtime ('cor' in instancia)
    // Permite tratar de forma polimórfica QUALQUER objeto que possua o atributo 'cor',
    // mesmo que venha de bibliotecas externas de terceiros sem acesso ao código-fonte!
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
