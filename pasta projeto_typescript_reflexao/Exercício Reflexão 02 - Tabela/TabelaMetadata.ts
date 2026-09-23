class TabelaMetadata {
    private static readonly mapaDeTabelas = new WeakMap<Function, string>();

    public static definir(construtor: Function, nomeTabela: string): void {
        TabelaMetadata.mapaDeTabelas.set(construtor, nomeTabela);
    }

    public static obter(construtor: Function): string | undefined {
        return TabelaMetadata.mapaDeTabelas.get(construtor);
    }
}

export { TabelaMetadata };