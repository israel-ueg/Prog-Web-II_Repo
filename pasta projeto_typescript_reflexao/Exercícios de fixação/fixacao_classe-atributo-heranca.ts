class Pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar(): void {
        console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos`);
    }
}

class Professor extends Pessoa {
    disciplina: string;

    constructor(nome: string, idade: number, disciplina: string) {
        super(nome, idade);
        this.disciplina = disciplina;
    }

    exibirDisciplina(): void {
        console.log(`${this.nome} leciona a disciplina de ${this.disciplina}`);
    }
}

class Aluno extends Pessoa {
    nota: number;

    constructor(nome: string, idade: number, nota: number) {
        super(nome, idade);
        this.nota = nota;
    }

    exibirAprovacao(): void {
        if (this.nota >= 6) {
            console.log("Aprovado");
        } else {
            console.log("Reprovado");
        }
    }
}

const aluno1 = new Aluno("João", 15, 6.0);
const aluno2 = new Aluno("Maria", 14, 5.0);

aluno1.apresentar();
aluno1.exibirAprovacao();
aluno2.apresentar();
aluno2.exibirAprovacao();

const professor = new Professor("José", 35, "História");
professor.apresentar();
professor.exibirDisciplina();