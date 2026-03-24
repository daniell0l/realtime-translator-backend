import { IChatRepository } from '../../../domain/repositories/chat-repository.interface';
import { ParticipantReaderPort } from '../../ports/participant-reader.port';
import { TranslationProvider } from '../../ports/translation.provider';
import { SendMessageUseCase } from '../send-message.use-case';

export function SendMessageUseCaseFactory(
  chatRepository: IChatRepository,
  participantReader: ParticipantReaderPort,
  translationProvider: TranslationProvider,
): SendMessageUseCase {
  return new SendMessageUseCase(
    chatRepository,
    participantReader,
    translationProvider,
  );
}
