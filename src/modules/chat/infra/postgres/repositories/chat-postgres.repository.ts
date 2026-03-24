import { Pool } from 'pg';
import { ChatMessageEntity } from '../../../domain/entities/chat-message.entity';
import { IChatRepository } from '../../../domain/repositories/chat-repository.interface';
import {
  CREATE_CHAT_MESSAGE_QUERY,
  FIND_CHAT_MESSAGES_BY_SESSION_ID_QUERY,
} from '../queries/chat.queries';

interface MessageRow {
  id: string;
  session_id: string;
  sender_id: string;
  sender_name: string;
  original_text: string;
  translated_text: string;
  source_locale: string;
  target_locale: string;
  created_at: Date;
}

export class ChatPostgresRepository implements IChatRepository {
  constructor(private readonly db: Pool) {}

  private mapRowToEntity(row: MessageRow): ChatMessageEntity {
    return new ChatMessageEntity(
      row.id,
      row.session_id,
      row.sender_id,
      row.sender_name,
      row.original_text,
      row.translated_text,
      row.source_locale,
      row.target_locale,
      new Date(row.created_at),
    );
  }

  async create(message: ChatMessageEntity): Promise<ChatMessageEntity> {
    const { rows } = await this.db.query<MessageRow>(CREATE_CHAT_MESSAGE_QUERY, [
      message.id,
      message.sessionId,
      message.senderId,
      message.senderName,
      message.originalText,
      message.translatedText,
      message.sourceLocale,
      message.targetLocale,
      message.createdAt,
    ]);

    return this.mapRowToEntity(rows[0]);
  }

  async findBySessionId(sessionId: string): Promise<ChatMessageEntity[]> {
    const { rows } = await this.db.query<MessageRow>(
      FIND_CHAT_MESSAGES_BY_SESSION_ID_QUERY,
      [sessionId],
    );

    return rows.map((row) => this.mapRowToEntity(row));
  }
}
