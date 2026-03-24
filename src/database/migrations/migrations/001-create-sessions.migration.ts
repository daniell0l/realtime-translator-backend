import { Migration } from '../migration.interface';

export const createSessionsMigration: Migration = {
  id: '001',
  name: 'create-sessions-table',
  up: [
    `
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY,
        code VARCHAR(10) NOT NULL UNIQUE,
        mode VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  ],
};
