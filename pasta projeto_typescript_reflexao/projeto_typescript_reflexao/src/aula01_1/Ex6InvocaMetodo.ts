import { Ex3Classe } from "./Ex3Classe";
import { lerEntrada } from "../utils/leitura";

async function main() {
    const objeto = new Ex3Classe("Maria", 28);
    //objeto.metodoPrivado();
    let nomeMetodo: string = "nome";
    // leitura de valor pelo teclado usando a função reaproveitável
    const entrada = await lerEntrada('Digite o nome do metodo: ');
    nomeMetodo = entrada || 'nome';
    console.log("--- Invocando Método Dinamicamente ---");
    console.log(`--- nomeMetodo=${nomeMetodo} = instancia: ${(objeto as any)[nomeMetodo]}`)
    if (typeof (objeto as any)[nomeMetodo] === 'function') {
        (objeto as any)[nomeMetodo]();
    } else {
        console.log(`Método ${nomeMetodo} não encontrado.`);
    }
}

main();

