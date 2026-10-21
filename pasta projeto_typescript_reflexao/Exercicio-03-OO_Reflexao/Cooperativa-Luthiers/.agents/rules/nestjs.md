# NestJS Rules
- Estrutura modular por domínio (modules/, controllers/, services/)
- Controllers apenas orquestram; lógica de negócio nos services
- Providers devem ser injetáveis via DI (evitar `new` manual)
- DTOs com validação usando `class-validator` e `class-transformer`
- Pipes globais para validação e transformação (`ValidationPipe`)
- Guards para autenticação/autorização; Interceptors para cross-cutting
- Configuração centralizada com `@nestjs/config` (envs tipados)
- Evitar lógica pesada em controllers e decorators
- Uso de async/await com tratamento adequado de exceções (`HttpException`)
- Não expor secrets no código; usar variáveis de ambiente
- Tratamento de exceções deve ser global via `ExceptionFilter`
- Criar uma exceção base de negócio (`BusinessException`)
- Toda regra de negócio deve lançar `BusinessException` (não usar `HttpException` direto)
- `BusinessException` deve possuir código próprio (ex: `LUTHIER_001`) para identificação
- `BusinessException` deve retornar um código HTTP (padrão 400), podendo ser alterado conforme necessário
- O `ExceptionFilter` global deve mapear `BusinessException` para resposta HTTP padronizada
- Resposta de erro deve conter: `code`, `message` e opcionalmente `details`

## Domínios do Projeto
- `luthiers/` — Entidade principal (Luthier)
- `instrumentos/` — Entidade filho (InstrumentoReparo), relacionada a Luthier
- `auth/` — Autenticação JWT (login, registro, ativação)
- `users/` — Gestão de usuários e seed do administrador
