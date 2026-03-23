import 'dotenv/config';
import { createApp } from './app';
import { closeDatabase, initializeDatabase } from '../shared/database/postgres';

const PORT = Number(process.env.PORT ?? 3333);

async function bootstrap(): Promise<void> {
  await initializeDatabase();

  const { server } = createApp();

  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  const shutdown = (signal: NodeJS.Signals): void => {
    console.log(`Recebido sinal ${signal}. Encerrando servidor...`);

    server.close(async (error?: Error) => {
      if (error) {
        console.error('Erro ao encerrar servidor HTTP:', error);
        process.exit(1);
        return;
      }

      await closeDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar aplicacao:', error);
  process.exit(1);
});
