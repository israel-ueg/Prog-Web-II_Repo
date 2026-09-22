export class HelloWorld {

    private nameClasse = "HelloWord Class";


    printInfo(): void {

        console.log("Classe concreta:");
        console.log(this.constructor.name);

        console.log("\nObjeto:");
        console.log(this);

        console.log("\nCadeia de herança:");

        let prototype = Object.getPrototypeOf(this);

        while (prototype && prototype !== Object.prototype) {

            console.log(
                `Classe: ${prototype.constructor.name}`
            );

            console.log(
                "Métodos:",
                Object.getOwnPropertyNames(prototype)
            );
            console.log(
                "Métodos do Objeto:",
                Object.getOwnPropertyNames(this)
            );
            console.log('----Passou\n')

            prototype = Object.getPrototypeOf(prototype);
        }
    }
}
