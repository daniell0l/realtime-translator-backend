import { ParticipantEntity } from '../entities/participant.entity';
import { IParticipantRepository } from '../repositories/participant-repository.interface';

export class FindParticipantByIdUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  execute(id: string): Promise<ParticipantEntity | undefined> {
    return this.participantRepository.findById(id);
  }
}
