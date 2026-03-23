import { ChatMessageEntity } from '../entities/chat-message.entity';

export class ChatRepository {
  private messages: ChatMessageEntity[] = [];

  create(message: ChatMessageEntity): ChatMessageEntity {
    this.messages.push(message);
    return message;
  }

  findBySessionId(sessionId: string): ChatMessageEntity[] {
    return this.messages.filter((message) => message.sessionId === sessionId);
  }
}