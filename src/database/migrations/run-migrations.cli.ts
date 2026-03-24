import 'dotenv/config';
import { closeDatabase, initializeDatabase } from '../../shared/db';

async function runMigrationsCli(): Promise<void> {
  try {
    await initializeDatabase();
    console.log('Migrations executadas com sucesso.');
  } finally {
    await closeDatabase();
  }
}

runMigrationsCli().catch((error) => {
  console.error('Falha ao executar migrations:', error);
  process.exit(1);
});
