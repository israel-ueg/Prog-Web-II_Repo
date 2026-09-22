import { Coisa } from "./Coisa";

export class Suv extends Coisa {
    public subcategoria: string;

    constructor(cor: string, subcategoria: string) {
        super(cor);
        this.subcategoria = subcategoria;
    }
}
