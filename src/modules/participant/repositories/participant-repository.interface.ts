import { ParticipantEntity } from '../entities/participant.entity';

export interface IParticipantRepository {
  create(participant: ParticipantEntity): Promise<ParticipantEntity>;
  findBySessionId(sessionId: string): Promise<ParticipantEntity[]>;
  findById(id: string): Promise<ParticipantEntity | undefined>;
}
