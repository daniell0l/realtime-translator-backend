import { SessionEntity } from '../entities/session.entity';

export interface ISessionRepository {
  create(session: SessionEntity): Promise<SessionEntity>;
  findByCode(code: string): Promise<SessionEntity | undefined>;
  findById(id: string): Promise<SessionEntity | undefined>;
  list(): Promise<SessionEntity[]>;
}
