// Class simulando uma biblioteca de terceiros (sem acesso ao código fonte)
// Ela possui a propriedade 'cor', mas NÃO estende 'Coisa' nem implementa interfaces do nosso projeto.
export class BrinquedoTerceiros {
    public cor: string;
    public material: string;

    constructor(cor: string, material: string) {
        this.cor = cor;
        this.material = material;
    }
}
