import { Migration } from '../migration.interface';

export const createIndexesMigration: Migration = {
  id: '004',
  name: 'create-query-indexes',
  up: [
    `
      CREATE INDEX IF NOT EXISTS idx_participants_session_id
      ON participants(session_id);
    `,
    `
      CREATE INDEX IF NOT EXISTS idx_messages_session_id
      ON messages(session_id);
    `,
  ],
};
