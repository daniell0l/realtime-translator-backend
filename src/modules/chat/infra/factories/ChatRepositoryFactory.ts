import { Pool } from 'pg';
import { IChatRepository } from '../../domain/repositories/chat-repository.interface';
import { ChatPostgresRepository } from '../postgres/repositories/chat-postgres.repository';

export function ChatRepositoryFactory(dbPool: Pool): IChatRepository {
  return new ChatPostgresRepository(dbPool);
}
