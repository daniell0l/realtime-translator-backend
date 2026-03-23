import { ParticipantEntity } from '../entities/participant.entity';

export class ParticipantRepository {
  private participants: ParticipantEntity[] = [];

  create(participant: ParticipantEntity): ParticipantEntity {
    this.participants.push(participant);
    return participant;
  }

  findBySessionId(sessionId: string): ParticipantEntity[] {
    return this.participants.filter((participant) => participant.sessionId === sessionId);
  }

  findById(id: string): ParticipantEntity | undefined {
    return this.participants.find((participant) => participant.id === id);
  }

  update(updatedParticipant: ParticipantEntity): ParticipantEntity {
    const index = this.participants.findIndex((participant) => participant.id === updatedParticipant.id);

    if (index >= 0) {
      this.participants[index] = updatedParticipant;
    }

    return updatedParticipant;
  }
}