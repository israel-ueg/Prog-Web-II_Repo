import { HelloWorld } from "./HelloWorld";

export class OlaMundo extends HelloWorld {

    private nomeFuncionalidade = "Eu sou uma funcionalidade";

    teste(a: number, b: number): void;
    teste(a: number, b: boolean): void;

    teste(a: number, b: number | boolean): void {
        console.log("Teste");
        console.log("a:", a);
        console.log("b:", b);
    }
}

