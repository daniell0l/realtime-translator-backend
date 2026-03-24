import { ChatMessageEntity } from '../entities/chat-message.entity';

export interface IChatRepository {
  create(message: ChatMessageEntity): Promise<ChatMessageEntity>;
  findBySessionId(sessionId: string): Promise<ChatMessageEntity[]>;
}
