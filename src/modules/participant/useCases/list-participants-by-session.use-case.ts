import { ParticipantEntity } from '../entities/participant.entity';
import { IParticipantRepository } from '../repositories/participant-repository.interface';

export class ListParticipantsBySessionUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  execute(sessionId: string): Promise<ParticipantEntity[]> {
    return this.participantRepository.findBySessionId(sessionId);
  }
}
