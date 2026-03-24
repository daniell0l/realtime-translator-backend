import { Migration } from '../migration.interface';

export const createParticipantsMigration: Migration = {
  id: '002',
  name: 'create-participants-table',
  up: [
    `
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
    `,
  ],
};
