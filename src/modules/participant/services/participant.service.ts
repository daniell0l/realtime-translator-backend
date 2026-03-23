import { v4 as uuid } from 'uuid';
import { ParticipantRepository } from '../repositories/participant.repository';
import { ParticipantEntity } from '../entities/participant.entity';
import { CreateParticipantInput } from '../interfaces/create-participant-input.interface';

export class ParticipantService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  createParticipant(input: CreateParticipantInput): ParticipantEntity {
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

  listBySessionId(sessionId: string): ParticipantEntity[] {
    return this.participantRepository.findBySessionId(sessionId);
  }

  findById(id: string): ParticipantEntity | undefined {
    return this.participantRepository.findById(id);
  }
}