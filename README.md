# Realtime Translator Backend

Backend em Node.js + TypeScript com persistencia em PostgreSQL.

## Requisitos

- Node.js 20+
- Docker Desktop com Docker Compose

## Configuracao

1. Copie o arquivo de exemplo de ambiente:

```powershell
Copy-Item .env.example .env
```

2. Ajuste os valores se necessario (usuario, senha, nome do banco e porta).

## Rodando com banco em Docker

1. Suba o Postgres:

```bash
npm run db:up
```

2. Inicie o backend:

```bash
npm run dev
```

Opcional: subir Postgres e iniciar backend em sequencia:

```bash
npm run dev:with-db
```

## Scripts uteis

- `npm run db:up`: sobe o container do Postgres.
- `npm run db:down`: derruba os containers.
- `npm run db:logs`: acompanha logs do banco.
- `npm run dev`: roda backend em desenvolvimento.
- `npm run build`: compila TypeScript.
- `npm run start`: roda build de producao.

## Observacoes

- Ao iniciar a aplicacao, o backend conecta no Postgres e cria as tabelas automaticamente se elas nao existirem.
- Se o banco ainda estiver iniciando, a aplicacao faz tentativas automaticas de conexao (`DB_CONNECT_RETRIES` e `DB_CONNECT_RETRY_DELAY_MS`).
