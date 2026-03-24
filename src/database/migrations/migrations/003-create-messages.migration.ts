import { Migration } from '../migration.interface';

export const createMessagesMigration: Migration = {
  id: '003',
  name: 'create-messages-table',
  up: [
    `
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
    `,
  ],
};
