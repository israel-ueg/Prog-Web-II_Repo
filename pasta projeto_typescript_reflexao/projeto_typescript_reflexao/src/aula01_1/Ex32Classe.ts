export class Ex32Classe {
    public nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    public falar(): void {
        console.log(`Bonjour, je m'appelle ${this.nome}`);
    }
}
