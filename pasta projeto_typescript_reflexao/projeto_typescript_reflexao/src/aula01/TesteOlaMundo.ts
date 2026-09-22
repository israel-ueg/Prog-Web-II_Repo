import { OlaMundo } from "./OlaMundo";
import { HelloWorld } from "./HelloWorld";

console.log("Ola Mundo:------------\n")
const olaMundo = new OlaMundo();

olaMundo.printInfo();
olaMundo.teste(1, 2);
olaMundo.teste(1, true);

console.log("fim ola ----\n");
console.log("antes hello-world\n")

const helloWorld = new HelloWorld();

helloWorld.printInfo();