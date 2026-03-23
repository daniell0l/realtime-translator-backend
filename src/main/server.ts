import { createApp } from './app';

const PORT = 3333;

const { server } = createApp();

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});