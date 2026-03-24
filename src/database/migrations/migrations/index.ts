import { Migration } from '../migration.interface';
import { createSessionsMigration } from './001-create-sessions.migration';
import { createParticipantsMigration } from './002-create-participants.migration';
import { createMessagesMigration } from './003-create-messages.migration';
import { createIndexesMigration } from './004-create-indexes.migration';

export const databaseMigrations: Migration[] = [
  createSessionsMigration,
  createParticipantsMigration,
  createMessagesMigration,
  createIndexesMigration,
];
