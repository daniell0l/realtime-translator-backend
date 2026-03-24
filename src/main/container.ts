import { Server } from 'socket.io';
import { dbPool } from '../shared/db';
import { SessionRepositoryFactory } from '../modules/session/repositories/factories/SessionRepositoryFactory';
import { ParticipantRepositoryFactory } from '../modules/participant/repositories/factories/ParticipantRepositoryFactory';
import { ChatRepositoryFactory } from '../modules/chat/repositories/factories/ChatRepositoryFactory';
import { CreateSessionUseCaseFactory } from '../modules/session/useCases/factories/CreateSessionUseCaseFactory';
import { FindSessionByCodeUseCaseFactory } from '../modules/session/useCases/factories/FindSessionByCodeUseCaseFactory';
import { CreateParticipantUseCaseFactory } from '../modules/participant/useCases/factories/CreateParticipantUseCaseFactory';
import { ListParticipantsBySessionUseCaseFactory } from '../modules/participant/useCases/factories/ListParticipantsBySessionUseCaseFactory';
import { SessionController } from '../modules/session/presentation/http/controllers/session.controller';
import { FakeTranslationProvider } from '../modules/chat/providers/implementations/fake-translation.provider';
import { SendMessageUseCaseFactory } from '../modules/chat/useCases/factories/SendMessageUseCaseFactory';
import { ChatGateway } from '../modules/chat/gateways/chat.gateway';
import { ParticipantReaderAdapter } from './adapters/participant-reader.adapter';

export function createContainer(io: Server): {
  sessionController: SessionController;
  chatGateway: ChatGateway;
} {
  const sessionRepository = SessionRepositoryFactory(dbPool);
  const participantRepository = ParticipantRepositoryFactory(dbPool);
  const chatRepository = ChatRepositoryFactory(dbPool);

  const createSessionUseCase = CreateSessionUseCaseFactory(sessionRepository);
  const findSessionByCodeUseCase = FindSessionByCodeUseCaseFactory(sessionRepository);
  const createParticipantUseCase = CreateParticipantUseCaseFactory(participantRepository);
  const listParticipantsBySessionUseCase = ListParticipantsBySessionUseCaseFactory(
    participantRepository,
  );

  const translationProvider = new FakeTranslationProvider();
  const participantReader = new ParticipantReaderAdapter(participantRepository);
  const sendMessageUseCase = SendMessageUseCaseFactory(
    chatRepository,
    participantReader,
    translationProvider,
  );

  const sessionController = new SessionController(
    createSessionUseCase,
    findSessionByCodeUseCase,
    createParticipantUseCase,
    listParticipantsBySessionUseCase,
  );

  const chatGateway = new ChatGateway(io, sendMessageUseCase);

  return {
    sessionController,
    chatGateway,
  };
}
