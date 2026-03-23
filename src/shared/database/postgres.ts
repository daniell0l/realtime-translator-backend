import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT = Number(process.env.DB_PORT ?? 5432);
const DB_NAME = process.env.DB_NAME ?? 'realtime_translator';
const DB_USER = process.env.DB_USER ?? 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'postgres';
const DB_SSL = process.env.DB_SSL === 'true';

if (Number.isNaN(DB_PORT)) {
  throw new Error('DB_PORT precisa ser um numero valido.');
}

export const dbPool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  ssl: DB_SSL ? { rejectUnauthorized: false } : undefined,
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureSchema(): Promise<void> {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY,
      code VARCHAR(10) NOT NULL UNIQUE,
      mode VARCHAR(20) NOT NULL,
      status VARCHAR(20) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS participants (
      id UUID PRIMARY KEY,
      session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      speak_locale VARCHAR(20) NOT NULL,
      listen_locale VARCHAR(20) NOT NULL,
      speak_country VARCHAR(10) NOT NULL,
      listen_country VARCHAR(10) NOT NULL,
      is_online BOOLEAN NOT NULL DEFAULT true,
      is_muted BOOLEAN NOT NULL DEFAULT false,
      joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY,
      session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      sender_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
      sender_name TEXT NOT NULL,
      original_text TEXT NOT NULL,
      translated_text TEXT NOT NULL,
      source_locale VARCHAR(20) NOT NULL,
      target_locale VARCHAR(20) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_participants_session_id
      ON participants(session_id);
  `);
  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_messages_session_id
      ON messages(session_id);
  `);
}

export async function initializeDatabase(): Promise<void> {
  const maxRetries = Number(process.env.DB_CONNECT_RETRIES ?? 15);
  const retryDelayMs = Number(process.env.DB_CONNECT_RETRY_DELAY_MS ?? 2000);

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      await dbPool.query('SELECT 1');
      await ensureSchema();
      console.log('Postgres conectado e schema validado com sucesso.');
      return;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      console.warn(
        `Tentativa ${attempt}/${maxRetries} de conexao com Postgres falhou. Nova tentativa em ${retryDelayMs}ms...`,
      );
      await wait(retryDelayMs);
    }
  }
}

export async function closeDatabase(): Promise<void> {
  await dbPool.end();
}
