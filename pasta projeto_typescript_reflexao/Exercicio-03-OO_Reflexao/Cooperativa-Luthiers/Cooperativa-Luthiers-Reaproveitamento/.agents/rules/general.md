# Monorepo — Regras Globais
- Stack: Nest.js 11 (`apps/backend`), Angular 20+ (`apps/frontend`)
- Gerenciador: pnpm workspaces + Turborepo
- Escopo dos pacotes: `@luthiers/*` (ex: `@luthiers/utils`, `@luthiers/eslint-config`)
- TypeScript strict em todos os pacotes
- Shared code exclusivamente em `packages/`
- Nunca importar de `apps/` dentro de `packages/`
- Conventional commits: `feat(backend):`, `feat(frontend):`, `fix(utils):`, `chore:`, `docs:`
- Sempre utilize os princípios de Clean Code, com enfoque no SRP (Single Responsibility Principle)
- Sempre utilize os princípios de Clean Architecture
