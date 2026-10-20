"use strict";
class Animal {
    nome;
    constructor(nome) {
        this.nome = nome;
    }
    apresentar() {
        console.log(`Eu me chamo ${this.nome}`);
    }
}
class Gato extends Animal {
}
const mingau = new Gato("Mingau");
mingau.apresentar();
mingau.emitirSom();
