import { Pool } from 'pg';
import { IParticipantRepository } from '../../domain/repositories/participant-repository.interface';
import { ParticipantPostgresRepository } from '../postgres/repositories/participant-postgres.repository';

export function ParticipantRepositoryFactory(dbPool: Pool): IParticipantRepository {
  return new ParticipantPostgresRepository(dbPool);
}
