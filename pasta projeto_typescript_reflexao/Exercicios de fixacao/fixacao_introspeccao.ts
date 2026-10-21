class IntrospeccaoAluno {
    nome: string;
    idade: number;
    nota: number;

    constructor(nome: string, idade: number, nota: number) {
        this.nome = nome;
        this.idade = idade;
        this.nota = nota;
    }
}

const a = new IntrospeccaoAluno("Joana", 14, 7.0);

console.log(a.constructor.name);
console.log(Object.keys(a));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(a)));