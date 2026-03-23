import { v4 as uuid } from 'uuid';
import { SessionRepository } from '../repositories/session.repository';
import { SessionEntity } from '../entities/session.entity';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { generateSessionCode } from '../../../shared/utils/generate-session-code';

export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  createSession(data: CreateSessionDto): SessionEntity {
    const session = new SessionEntity(
      uuid(),
      generateSessionCode(),
      data.mode,
      'waiting',
      new Date(),
    );

    return this.sessionRepository.create(session);
  }

  findByCode(code: string): SessionEntity | undefined {
    return this.sessionRepository.findByCode(code);
  }

  findById(id: string): SessionEntity | undefined {
    return this.sessionRepository.findById(id);
  }
}