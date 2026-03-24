import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
  override: true,
});

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variavel de ambiente obrigatoria ausente: ${name}`);
  }

  return value;
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value ?? fallback);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}

export const env = {
  app: {
    port: parseNumber(process.env.PORT, 3333),
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseNumber(process.env.DB_PORT, 5432),
    name: process.env.DB_NAME ?? 'realtime_translator',
    user: getRequiredEnv('DB_USER'),
    password: getRequiredEnv('DB_PASSWORD'),
    ssl: process.env.DB_SSL === 'true',
    connectRetries: parseNumber(process.env.DB_CONNECT_RETRIES, 15),
    connectRetryDelayMs: parseNumber(process.env.DB_CONNECT_RETRY_DELAY_MS, 2000),
  },
};
