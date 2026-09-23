import { TabelaMetadata } from "./TabelaMetadata";

abstract class SuperTabela {

    public getTableName(): string {
        const construtorDaInstancia = this.constructor;
        const nomeRegistrado = TabelaMetadata.obter(construtorDaInstancia);

        // Fallback de segurança, caso a classe não tenha sido decorada
        return nomeRegistrado ?? construtorDaInstancia.name;
    }
}

export { SuperTabela };