import { v4 as uuid } from 'uuid';
import { ParticipantEntity } from '../../domain/entities/participant.entity';
import { IParticipantRepository } from '../../domain/repositories/participant-repository.interface';
import { CreateParticipantDto } from '../dtos/create-participant.dto';

export class CreateParticipantUseCase {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  execute(input: CreateParticipantDto): Promise<ParticipantEntity> {
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
}
