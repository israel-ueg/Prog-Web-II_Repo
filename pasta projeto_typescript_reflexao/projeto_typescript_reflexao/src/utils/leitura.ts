import * as readline from 'readline';

/**
 * Lê uma linha de entrada via teclado no terminal.
 * @param mensagem O texto de instrução/prompt a ser exibido no terminal.
 * @returns Promise<string> O texto digitado pelo usuário.
 */
export async function lerEntrada(mensagem: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(mensagem, (resposta: string) => {
            resolve(resposta);
            rl.close();
        });
    });
}
