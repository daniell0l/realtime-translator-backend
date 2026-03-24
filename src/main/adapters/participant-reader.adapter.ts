import { ParticipantReaderPort } from '../../modules/chat/application/ports/participant-reader.port';
import { IParticipantRepository } from '../../modules/participant/domain/repositories/participant-repository.interface';

export class ParticipantReaderAdapter implements ParticipantReaderPort {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  async findById(id: string): Promise<
    | {
        id: string;
        name: string;
        speakLocale: string;
        listenLocale: string;
      }
    | undefined
  > {
    const participant = await this.participantRepository.findById(id);

    if (!participant) {
      return undefined;
    }

    return {
      id: participant.id,
      name: participant.name,
      speakLocale: participant.speakLocale,
      listenLocale: participant.listenLocale,
    };
  }
}
