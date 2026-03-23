import { Pool } from 'pg';
import { SessionEntity } from '../entities/session.entity';
import { SessionMode } from '../../../shared/types/session-mode';
import { SessionStatus } from '../../../shared/types/session-status';
import { ISessionRepository } from './session-repository.interface';
import {
  CREATE_SESSION_QUERY,
  FIND_SESSION_BY_CODE_QUERY,
  FIND_SESSION_BY_ID_QUERY,
  LIST_SESSIONS_QUERY,
  UPDATE_SESSION_QUERY,
} from './session.queries';

interface SessionRow {
  id: string;
  code: string;
  mode: SessionMode;
  status: SessionStatus;
  created_at: Date;
}

export class SessionRepository implements ISessionRepository {
  constructor(private readonly db: Pool) {}

  private mapRowToEntity(row: SessionRow): SessionEntity {
    return new SessionEntity(
      row.id,
      row.code,
      row.mode,
      row.status,
      new Date(row.created_at),
    );
  }

  async create(session: SessionEntity): Promise<SessionEntity> {
    const { rows } = await this.db.query<SessionRow>(CREATE_SESSION_QUERY, [
      session.id,
      session.code,
      session.mode,
      session.status,
      session.createdAt,
    ]);

    return this.mapRowToEntity(rows[0]);
  }

  async findByCode(code: string): Promise<SessionEntity | undefined> {
    const { rows } = await this.db.query<SessionRow>(FIND_SESSION_BY_CODE_QUERY, [
      code,
    ]);

    if (rows.length === 0) {
      return undefined;
    }

    return this.mapRowToEntity(rows[0]);
  }

  async findById(id: string): Promise<SessionEntity | undefined> {
    const { rows } = await this.db.query<SessionRow>(FIND_SESSION_BY_ID_QUERY, [id]);

    if (rows.length === 0) {
      return undefined;
    }

    return this.mapRowToEntity(rows[0]);
  }

  async update(updatedSession: SessionEntity): Promise<SessionEntity> {
    const { rows } = await this.db.query<SessionRow>(UPDATE_SESSION_QUERY, [
      updatedSession.id,
      updatedSession.code,
      updatedSession.mode,
      updatedSession.status,
      updatedSession.createdAt,
    ]);

    if (rows.length === 0) {
      return updatedSession;
    }

    return this.mapRowToEntity(rows[0]);
  }

  async list(): Promise<SessionEntity[]> {
    const { rows } = await this.db.query<SessionRow>(LIST_SESSIONS_QUERY);

    return rows.map((row) => this.mapRowToEntity(row));
  }
}
