import { IChatRepository } from '../../repositories/chat-repository.interface';
import { ParticipantReaderPort } from '../../providers/participant-reader.port';
import { TranslationProvider } from '../../providers/translation.provider';
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
