import { Pool } from 'pg';
import { IParticipantRepository } from '../participant-repository.interface';
import { ParticipantPostgresRepository } from '../../infra/postgres/repositories/participant-postgres.repository';

export function ParticipantRepositoryFactory(dbPool: Pool): IParticipantRepository {
  return new ParticipantPostgresRepository(dbPool);
}
