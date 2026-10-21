abstract class Animal {
    nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    abstract emitirSom(): void;

    apresentar(): void {
        console.log(`Eu me chamo ${this.nome}`);
    }
}

class Gato extends Animal {
    emitirSom(): void {
        console.log(`Miau, miau!`);
    }
}

const mingau = new Gato("Mingau");
mingau.apresentar();
mingau.emitirSom();