import { Pool } from 'pg';
import { ISessionRepository } from '../session-repository.interface';
import { SessionPostgresRepository } from '../../infra/postgres/repositories/session-postgres.repository';

export function SessionRepositoryFactory(dbPool: Pool): ISessionRepository {
  return new SessionPostgresRepository(dbPool);
}
