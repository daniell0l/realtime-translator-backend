import { v4 as uuid } from 'uuid';
import { ChatRepository } from '../repositories/chat.repository';
import { ParticipantRepository } from '../../participant/repositories/participant.repository';
import { ChatMessageEntity } from '../entities/chat-message.entity';
import { TranslationProvider } from '../../voice/providers/translation/translation.provider';
import { SendMessageInput } from '../interfaces/send-message-input.interface';

export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly participantRepository: ParticipantRepository,
    private readonly translationProvider: TranslationProvider,
  ) {}

  async sendMessage(input: SendMessageInput): Promise<ChatMessageEntity> {
    const sender = this.participantRepository.findById(input.senderId);

    if (!sender) {
      throw new Error('Participante não encontrado.');
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

  listBySessionId(sessionId: string): ChatMessageEntity[] {
    return this.chatRepository.findBySessionId(sessionId);
  }
}