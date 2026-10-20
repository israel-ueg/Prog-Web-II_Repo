"use strict";
class Relatorio {
    identificador;
    titulo;
    constructor(identificador, titulo) {
        this.identificador = identificador;
        this.titulo = titulo;
    }
    imprimir() {
        console.log(`Imprimindo relatório ${this.identificador} - ${this.titulo}`);
    }
}
class Foto {
    edicao;
    constructor(edicao) {
        this.edicao = edicao;
    }
    imprimir() {
        console.log(`Imprimindo foto ${this.edicao}`);
    }
}
class Contrato {
    numero;
    constructor(numero) {
        this.numero = numero;
    }
    imprimir() {
        console.log(`Imprimindo contrato ${this.numero}`);
    }
}
class Pessoas {
    nome;
    idade;
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    apresentar() {
        console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos`);
    }
}
function imprimirTudo(itens) {
    for (const item of itens) {
        item.imprimir();
    }
}
const relatorio = new Relatorio(1, "Relatório 1");
const foto = new Foto(1);
const contrato = new Contrato(1);
imprimirTudo([relatorio, foto, contrato, Pessoas]);
