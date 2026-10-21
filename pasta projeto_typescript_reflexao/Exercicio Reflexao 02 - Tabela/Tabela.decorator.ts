import { TabelaMetadata } from "./TabelaMetadata";
function Tabela(target: Function): void;
function Tabela(nomeTabela: string): (target: Function) => void;
function Tabela(nomeOuTarget?: string | Function): any {

    if (typeof nomeOuTarget === "function") {
        TabelaMetadata.definir(nomeOuTarget, nomeOuTarget.name);
        return;
    }

    return function (target: Function): void {
        const nomeTabela = nomeOuTarget ?? target.name;
        TabelaMetadata.definir(target, nomeTabela);
    };
}

export { Tabela };