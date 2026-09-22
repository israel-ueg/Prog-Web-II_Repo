import { Ex3Classe } from "./Ex3Classe";
import { HelloWorld } from "../aula01/HelloWorld";
import { OlaMundo } from "../aula01/OlaMundo";
import { Ex31Classe } from "./Ex31Classe";
import { Ex32Classe } from "./Ex32Classe";

const objeto = new Ex3Classe("Teste", 30);
const objeto2 = new Ex31Classe("Test", 31);
const objeto3 = new Ex32Classe("Le teste");
const helloWorld = new HelloWorld();
const olaMundo = new OlaMundo();
const vetor: any[] = [objeto, objeto2, objeto3, helloWorld, olaMundo];



console.log("--- Verificação de Classe ---");
console.log("O objeto é instância de Ex3Classe?", objeto instanceof Ex3Classe);
console.log("Nome da classe do construtor:", objeto.constructor.name);
console.log("O objeto é instância de HelloWorld?", olaMundo instanceof Ex3Classe);
console.log("Nome da classe do construtor:", olaMundo.constructor.name);

console.log('lista de objeto para validar:\n')
vetor.forEach((item) => {
    // if (item instanceof Ex3Classe) {
    //     item.falar();

    // }
    // else if (item instanceof HelloWorld) {
    //     item.printInfo();
    // }
    console.log('-------------');
    console.log(`E instancia de ${item.constructor.name} e instancia de Ex3Classe? ${item instanceof Ex3Classe}`);
    console.log(`E instancia de ${item.constructor.name} e instancia de HelloWorld? ${item instanceof HelloWorld}`);
    console.log(`E instancia de ${item.constructor.name} e instancia de OlaMundo? ${item instanceof OlaMundo}`);
    console.log('--------------');
    if (item instanceof Ex3Classe) {
        item.falar();
    }
    //quero quer pegue a lista de metodos do objeto item e verifique se ele tem um metodo falar se tiver chame
    const prototipo = Object.getPrototypeOf(item);
    const metodos = Object.getOwnPropertyNames(prototipo)
        .filter(prop => typeof prototipo[prop] === 'function' && prop !== 'constructor');
    if (metodos.includes('falar')) {
        console.log(`O objeto ${item.constructor.name} tem o metodo falar, chamando...`)
        item.falar();
    }
});

