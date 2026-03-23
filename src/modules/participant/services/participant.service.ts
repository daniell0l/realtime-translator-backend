import { v4 as uuid } from 'uuid';
import { ParticipantEntity } from '../entities/participant.entity';
import { CreateParticipantInput } from '../interfaces/create-participant-input.interface';
import { IParticipantRepository } from '../repositories/participant-repository.interface';

export class ParticipantService {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  createParticipant(input: CreateParticipantInput): Promise<ParticipantEntity> {
    const participant = new ParticipantEntity(
      uuid(),
      input.sessionId,
      input.name,
      input.speakLocale,
      input.listenLocale,
      input.speakCountry,
      input.listenCountry,
      true,
      false,
      new Date(),
    );

    return this.participantRepository.create(participant);
  }

  listBySessionId(sessionId: string): Promise<ParticipantEntity[]> {
    return this.participantRepository.findBySessionId(sessionId);
  }

  findById(id: string): Promise<ParticipantEntity | undefined> {
    return this.participantRepository.findById(id);
  }
}
