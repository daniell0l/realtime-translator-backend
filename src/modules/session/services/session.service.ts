import { v4 as uuid } from 'uuid';
import { SessionEntity } from '../entities/session.entity';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { generateSessionCode } from '../../../shared/utils/generate-session-code';
import { ISessionRepository } from '../repositories/session-repository.interface';

export class SessionService {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<SessionEntity> {
    const maxAttempts = 10;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const code = generateSessionCode();
      const existingSession = await this.sessionRepository.findByCode(code);

      if (existingSession) {
        continue;
      }

      const session = new SessionEntity(
        uuid(),
        code,
        data.mode,
        'waiting',
        new Date(),
      );

      return this.sessionRepository.create(session);
    }

    throw new Error('Nao foi possivel gerar um codigo unico para a sessao.');
  }

  findByCode(code: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findByCode(code);
  }

  findById(id: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findById(id);
  }
}
