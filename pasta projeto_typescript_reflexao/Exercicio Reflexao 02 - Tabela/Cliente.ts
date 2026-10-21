import { SuperTabela } from "./SuperTabela";
import { Tabela } from "./Tabela.Decorator";

@Tabela("clientes_pessoa_juridica")
class Cliente extends SuperTabela {
    private cnpj: string;

    constructor(cnpj: string) {
        super();
        this.cnpj = cnpj;
    }

    public getCnpj(): string {
        return this.cnpj;
    }
}

export { Cliente };