import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { SessionRepository } from '../modules/session/repositories/session.repository';
import { ParticipantRepository } from '../modules/participant/repositories/participant.repository';
import { ChatRepository } from '../modules/chat/repositories/chat.repository';

import { SessionService } from '../modules/session/services/session.service';
import { ParticipantService } from '../modules/participant/services/participant.service';
import { ChatService } from '../modules/chat/services/chat.service';

import { SessionController } from '../modules/session/controllers/session.controller';
import { createSessionRoutes } from '../modules/session/routes/session.routes';

import { FakeTranslationProvider } from '../modules/voice/providers/translation/fake-translation.provider';
import { ChatGateway } from '../modules/chat/gateways/chat.gateway';
import { dbPool } from '../shared/database/postgres';

export function createApp() {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  const sessionRepository = new SessionRepository(dbPool);
  const participantRepository = new ParticipantRepository(dbPool);
  const chatRepository = new ChatRepository(dbPool);

  const sessionService = new SessionService(sessionRepository);
  const participantService = new ParticipantService(participantRepository);
  const translationProvider = new FakeTranslationProvider();
  const chatService = new ChatService(
    chatRepository,
    participantRepository,
    translationProvider,
  );

  const sessionController = new SessionController(
    sessionService,
    participantService,
  );

  const chatGateway = new ChatGateway(io, chatService);

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
