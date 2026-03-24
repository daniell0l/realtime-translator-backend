import { ChatMessageEntity } from '../../domain/entities/chat-message.entity';
import { IChatRepository } from '../../domain/repositories/chat-repository.interface';

export class ListMessagesBySessionUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  execute(sessionId: string): Promise<ChatMessageEntity[]> {
    return this.chatRepository.findBySessionId(sessionId);
  }
}
