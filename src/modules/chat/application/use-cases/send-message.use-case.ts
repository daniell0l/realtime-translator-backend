import { v4 as uuid } from 'uuid';
import { SendMessageDto } from '../dtos/send-message.dto';
import { ParticipantReaderPort } from '../ports/participant-reader.port';
import { TranslationProvider } from '../ports/translation.provider';
import { ChatMessageEntity } from '../../domain/entities/chat-message.entity';
import { IChatRepository } from '../../domain/repositories/chat-repository.interface';

export class SendMessageUseCase {
  constructor(
    private readonly chatRepository: IChatRepository,
    private readonly participantReader: ParticipantReaderPort,
    private readonly translationProvider: TranslationProvider,
  ) {}

  async execute(input: SendMessageDto): Promise<ChatMessageEntity> {
    const sender = await this.participantReader.findById(input.senderId);

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
}
