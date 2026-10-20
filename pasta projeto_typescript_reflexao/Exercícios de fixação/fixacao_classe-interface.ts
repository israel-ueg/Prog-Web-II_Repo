interface Imprimivel {
    imprimir(): void;
}

class Relatorio implements Imprimivel {
    identificador: number;
    titulo: string;

    constructor(identificador: number, titulo: string) {
        this.identificador = identificador;
        this.titulo = titulo;
    }
    imprimir(): void {
        console.log(`Imprimindo relatório ${this.identificador} - ${this.titulo}`);
    }
}

class Foto implements Imprimivel {
    edicao: number;
    constructor(edicao: number) {
        this.edicao = edicao;
    }
    imprimir(): void {
        console.log(`Imprimindo foto ${this.edicao}`);
    }
}

class Contrato implements Imprimivel {
    numero: number;
    constructor(numero: number) {
        this.numero = numero;
    }
    imprimir(): void {
        console.log(`Imprimindo contrato ${this.numero}`);
    }
}

function imprimirTudo(itens: Imprimivel[]) {
    for (const item of itens) {
        item.imprimir();
    }
}

const relatorio = new Relatorio(1, "Relatório 1");
const foto = new Foto(1);
const contrato = new Contrato(1);

imprimirTudo([relatorio, foto, contrato]);