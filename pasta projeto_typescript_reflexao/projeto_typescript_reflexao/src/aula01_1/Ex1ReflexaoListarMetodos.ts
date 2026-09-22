import "reflect-metadata";
import { Ex3Classe } from "./Ex3Classe";

const objeto = new Ex3Classe("Teste", 30);
const prototipo = Object.getPrototypeOf(objeto);
console.log(" -- lista de todas as propriedades");
const propriedades = Object.getOwnPropertyNames(prototipo)
propriedades.forEach(prop => console.log(prop));
console.log(" -- lista de todas as propriedades do objeto");
const propriedadesObjeto = Object.getOwnPropertyNames(objeto)
propriedadesObjeto.forEach(prop => console.log(prop));


console.log("--- Métodos da Classe ---");
// Em TypeScript/JS, obtemos os métodos lendo as propriedades do protótipo
const metodos = Object.getOwnPropertyNames(prototipo)
    .filter(prop => typeof prototipo[prop] === 'function' && prop !== 'constructor');

metodos.forEach(metodo => console.log(metodo));
