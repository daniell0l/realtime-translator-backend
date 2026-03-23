import { v4 as uuid } from 'uuid';
import { ChatMessageEntity } from '../entities/chat-message.entity';
import { TranslationProvider } from '../../voice/providers/translation/translation.provider';
import { SendMessageInput } from '../interfaces/send-message-input.interface';
import { IChatRepository } from '../repositories/chat-repository.interface';
import { IParticipantRepository } from '../../participant/repositories/participant-repository.interface';

export class ChatService {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly participantRepository: IParticipantRepository,
    private readonly translationProvider: TranslationProvider,
  ) {}

  async sendMessage(input: SendMessageInput): Promise<ChatMessageEntity> {
    const sender = await this.participantRepository.findById(input.senderId);

    if (!sender) {
      throw new Error('Participante nao encontrado.');
    }

    const translation = await this.translationProvider.translate({
      text: input.text,
      from: sender.speakLocale,
      to: sender.listenLocale,
    });

    const message = new ChatMessageEntity(
      uuid(),
      input.sessionId,
      sender.id,
      sender.name,
      input.text,
      translation.translatedText,
      sender.speakLocale,
      sender.listenLocale,
      new Date(),
    );

    return this.chatRepository.create(message);
  }

  listBySessionId(sessionId: string): Promise<ChatMessageEntity[]> {
    return this.chatRepository.findBySessionId(sessionId);
  }
}
