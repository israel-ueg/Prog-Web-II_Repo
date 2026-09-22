# Diretrizes para Assistentes AI (AGENTS)

## Funções Utilitárias do Projeto

### Leitura de Dados via Terminal (`lerEntrada`)
- **Arquivo**: [`src/utils/leitura.ts`](src/utils/leitura.ts)
- **Assinatura**: `lerEntrada(mensagem: string): Promise<string>`
- **Descrição**: Função assíncrona reutilizável para ler entradas do usuário via terminal usando o módulo `readline` do Node.js.

#### Exemplo de Uso:
```typescript
import { lerEntrada } from "../utils/leitura";

async function main() {
    const entrada = await lerEntrada("Digite o valor desejado: ");
    console.log(`Você digitou: ${entrada}`);
}

main();
```
