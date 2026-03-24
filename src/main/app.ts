import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createSessionRoutes } from '../modules/session/presentation/http/routes/session.routes';
import { createContainer } from './container';

export function createApp(): {
  app: express.Express;
  server: http.Server;
} {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  const { sessionController, chatGateway } = createContainer(io);

  app.use('/sessions', createSessionRoutes(sessionController));

  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    chatGateway.registerEvents(socket);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return { app, server };
}
