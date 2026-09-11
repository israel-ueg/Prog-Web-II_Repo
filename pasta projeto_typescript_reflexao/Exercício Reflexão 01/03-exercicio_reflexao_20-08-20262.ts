// Pessoa.ts
abstract class Pessoa {
    private nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public abstract getTipoVoz(): string;
}

// Avo.ts
class Avo extends Pessoa {
    private aposentadoria: number;

    constructor(nome: string, aposentadoria: number) {
        super(nome);
        this.aposentadoria = aposentadoria;
    }

    public getAposentadoria(): number {
        return this.aposentadoria;
    }

    public setAposentadoria(valor: number): void {
        this.aposentadoria = valor;
    }

    public getTipoVoz(): string {
        return "grave";
    }
}

// Pai.ts
class Pai extends Pessoa {
    private profissao: string;

    constructor(nome: string, profissao: string) {
        super(nome);
        this.profissao = profissao;
    }

    public getProfissao(): string {
        return this.profissao;
    }

    public setProfissao(valor: string): void {
        this.profissao = valor;
    }

    public getTipoVoz(): string {
        return "media";
    }
}

// Filho.ts
class Filho extends Pessoa {
    private escola: string;

    constructor(nome: string, escola: string) {
        super(nome);
        this.escola = escola;
    }

    public getEscola(): string {
        return this.escola;
    }

    public setEscola(valor: string): void {
        this.escola = valor;
    }

    public getTipoVoz(): string {
        return "agudo";
    }
}

// Reflexao.ts
class Reflexao {
    public listarAtributos(obj: Pessoa): string[] {
        return Object.keys(obj);
    }

    public listarMetodos(obj: Pessoa): string[] {
        const metodos: string[] = [];
        let manual = Object.getPrototypeOf(obj);

        while (manual !== Object.prototype) {
            const metodosDoNivel = this.listarMetodosDoManual(manual);
            metodos.push(...metodosDoNivel);
            manual = Object.getPrototypeOf(manual);
        }

        return metodos;
    }

    private listarMetodosDoManual(manual: any): string[] {
        const nomeClasse = manual.constructor.name;
        return Object.getOwnPropertyNames(manual)
            .filter(nome => this.ehMetodo(manual, nome))
            .map(nome => `${nomeClasse}.${nome}`);
    }

    private ehMetodo(manual: any, nome: string): boolean {
        return nome !== "constructor" && typeof manual[nome] === "function";
    }

    public exibir(obj: Pessoa): void {
        console.log("Atributos:", this.listarAtributos(obj));
        console.log("Métodos:", this.listarMetodos(obj));
    }
}

// Teste
const avo = new Avo("José", 3500);
const pai = new Pai("Carlos", "Engenheiro");
const filho = new Filho("Lucas", "Colégio Estadual");

const reflexao = new Reflexao();

reflexao.exibir(avo);
reflexao.exibir(pai);
reflexao.exibir(filho);