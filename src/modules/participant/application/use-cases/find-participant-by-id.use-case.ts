import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { IParticipantRepository } from '../../domain/repositories/participant-repository.interface';

export class FindParticipantByIdUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  execute(id: string): Promise<ParticipantEntity | undefined> {
    return this.participantRepository.findById(id);
  }
}
