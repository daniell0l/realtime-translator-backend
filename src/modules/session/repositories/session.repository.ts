import { SessionEntity } from '../entities/session.entity'

export class SessionRepository {
  private sessions: SessionEntity[] = [];

  create(session: SessionEntity): SessionEntity {
    this.sessions.push(session);
    return session;
  }

  findByCode(code: string): SessionEntity | undefined {
    return this.sessions.find((session) => session.code === code);
  }

  findById(id: string): SessionEntity | undefined {
    return this.sessions.find((session) => session.id === id);
  }

  update(updatedSession: SessionEntity): SessionEntity {
    const index = this.sessions.findIndex((session) => session.id === updatedSession.id);

    if (index >= 0) {
      this.sessions[index] = updatedSession;
    }

    return updatedSession;
  }

  list(): SessionEntity[] {
    return this.sessions;
  }
}