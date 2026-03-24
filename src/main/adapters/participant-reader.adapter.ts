import { ParticipantReaderPort } from '../../domain/chat/providers/participant-reader.port';
import { IParticipantRepository } from '../../domain/participant/repositories/participant-repository.interface';

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
