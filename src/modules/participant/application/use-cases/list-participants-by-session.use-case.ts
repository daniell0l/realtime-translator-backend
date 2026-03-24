import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { IParticipantRepository } from '../../domain/repositories/participant-repository.interface';

export class ListParticipantsBySessionUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  execute(sessionId: string): Promise<ParticipantEntity[]> {
    return this.participantRepository.findBySessionId(sessionId);
  }
}
