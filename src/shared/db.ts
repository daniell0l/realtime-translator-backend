import { Pool } from 'pg';
import { env } from './config/env';
import { runPendingMigrations } from '../database/migrations/migration-runner';
import { databaseMigrations } from '../database/migrations/migrations';

export const dbPool = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined,
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function initializeDatabase(): Promise<void> {
  for (let attempt = 1; attempt <= env.db.connectRetries; attempt += 1) {
    try {
      await dbPool.query('SELECT 1');
      await runPendingMigrations(dbPool, databaseMigrations);
      console.log('Postgres conectado e migrations sincronizadas.');
      return;
    } catch (error) {
      if (attempt === env.db.connectRetries) {
        throw error;
      }

      const normalizedError =
        error instanceof Error ? `${error.name}: ${error.message}` : String(error);

      console.warn(
        `Tentativa ${attempt}/${env.db.connectRetries} de conexao com Postgres falhou (${normalizedError}). Nova tentativa em ${env.db.connectRetryDelayMs}ms...`,
      );
      await wait(env.db.connectRetryDelayMs);
    }
  }
}

export async function closeDatabase(): Promise<void> {
  await dbPool.end();
}
