import { SuperTabela } from "./SuperTabela";
import { Tabela } from "./Tabela.Decorator";

@Tabela
class Usuario extends SuperTabela {
    private id: number;
    private nome: string;

    constructor(id: number, nome: string) {
        super();
        this.id = id;
        this.nome = nome;
    }

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }
}

export { Usuario };