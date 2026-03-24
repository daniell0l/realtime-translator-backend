import { Pool } from 'pg';
import { Migration } from './migration.interface';

const CREATE_SCHEMA_MIGRATIONS_QUERY = `
  CREATE TABLE IF NOT EXISTS schema_migrations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

interface AppliedMigrationRow {
  id: string;
}

export async function runPendingMigrations(
  dbPool: Pool,
  migrations: Migration[],
): Promise<void> {
  await dbPool.query(CREATE_SCHEMA_MIGRATIONS_QUERY);

  const { rows } = await dbPool.query<AppliedMigrationRow>(
    'SELECT id FROM schema_migrations',
  );

  const appliedMigrationIds = new Set(rows.map((row) => row.id));

  for (const migration of migrations.sort((first, second) =>
    first.id.localeCompare(second.id),
  )) {
    if (appliedMigrationIds.has(migration.id)) {
      continue;
    }

    const client = await dbPool.connect();

    try {
      await client.query('BEGIN');

      for (const statement of migration.up) {
        await client.query(statement);
      }

      await client.query(
        'INSERT INTO schema_migrations (id, name) VALUES ($1, $2)',
        [migration.id, migration.name],
      );

      await client.query('COMMIT');
      console.log(`Migration ${migration.id} - ${migration.name} aplicada.`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
