import { Pool } from 'pg';
import { ParticipantEntity } from '../entities/participant.entity';
import { IParticipantRepository } from './participant-repository.interface';
import {
  CREATE_PARTICIPANT_QUERY,
  FIND_PARTICIPANT_BY_ID_QUERY,
  FIND_PARTICIPANTS_BY_SESSION_ID_QUERY,
  UPDATE_PARTICIPANT_QUERY,
} from './participant.queries';

interface ParticipantRow {
  id: string;
  session_id: string;
  name: string;
  speak_locale: string;
  listen_locale: string;
  speak_country: string;
  listen_country: string;
  is_online: boolean;
  is_muted: boolean;
  joined_at: Date;
}

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly db: Pool) {}

  private mapRowToEntity(row: ParticipantRow): ParticipantEntity {
    return new ParticipantEntity(
      row.id,
      row.session_id,
      row.name,
      row.speak_locale,
      row.listen_locale,
      row.speak_country,
      row.listen_country,
      row.is_online,
      row.is_muted,
      new Date(row.joined_at),
    );
  }

  async create(participant: ParticipantEntity): Promise<ParticipantEntity> {
    const { rows } = await this.db.query<ParticipantRow>(CREATE_PARTICIPANT_QUERY, [
      participant.id,
      participant.sessionId,
      participant.name,
      participant.speakLocale,
      participant.listenLocale,
      participant.speakCountry,
      participant.listenCountry,
      participant.isOnline,
      participant.isMuted,
      participant.joinedAt,
    ]);

    return this.mapRowToEntity(rows[0]);
  }

  async findBySessionId(sessionId: string): Promise<ParticipantEntity[]> {
    const { rows } = await this.db.query<ParticipantRow>(
      FIND_PARTICIPANTS_BY_SESSION_ID_QUERY,
      [sessionId],
    );

    return rows.map((row) => this.mapRowToEntity(row));
  }

  async findById(id: string): Promise<ParticipantEntity | undefined> {
    const { rows } = await this.db.query<ParticipantRow>(FIND_PARTICIPANT_BY_ID_QUERY, [
      id,
    ]);

    if (rows.length === 0) {
      return undefined;
    }

    return this.mapRowToEntity(rows[0]);
  }

  async update(updatedParticipant: ParticipantEntity): Promise<ParticipantEntity> {
    const { rows } = await this.db.query<ParticipantRow>(UPDATE_PARTICIPANT_QUERY, [
      updatedParticipant.id,
      updatedParticipant.sessionId,
      updatedParticipant.name,
      updatedParticipant.speakLocale,
      updatedParticipant.listenLocale,
      updatedParticipant.speakCountry,
      updatedParticipant.listenCountry,
      updatedParticipant.isOnline,
      updatedParticipant.isMuted,
      updatedParticipant.joinedAt,
    ]);

    if (rows.length === 0) {
      return updatedParticipant;
    }

    return this.mapRowToEntity(rows[0]);
  }
}
