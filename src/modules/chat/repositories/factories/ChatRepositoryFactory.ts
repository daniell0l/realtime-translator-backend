import { Pool } from 'pg';
import { IChatRepository } from '../chat-repository.interface';
import { ChatPostgresRepository } from '../../infra/postgres/repositories/chat-postgres.repository';

export function ChatRepositoryFactory(dbPool: Pool): IChatRepository {
  return new ChatPostgresRepository(dbPool);
}
