import { Pool } from 'pg';
import { ISessionRepository } from '../../domain/repositories/session-repository.interface';
import { SessionPostgresRepository } from '../postgres/repositories/session-postgres.repository';

export function SessionRepositoryFactory(dbPool: Pool): ISessionRepository {
  return new SessionPostgresRepository(dbPool);
}
