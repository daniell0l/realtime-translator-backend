import { v4 as uuid } from 'uuid';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { SessionEntity } from '../../domain/entities/session.entity';
import { ISessionRepository } from '../../domain/repositories/session-repository.interface';
import { generateSessionCode } from '../../../../shared/utils/generate-session-code';

export class CreateSessionUseCase {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  async execute(data: CreateSessionDto): Promise<SessionEntity> {
    const maxAttempts = 10;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const code = generateSessionCode();
      const existingSession = await this.sessionRepository.findByCode(code);

      if (existingSession) {
        continue;
      }

      const session = new SessionEntity(uuid(), code, data.mode, 'waiting', new Date());
      return this.sessionRepository.create(session);
    }

    throw new Error('Nao foi possivel gerar um codigo unico para a sessao.');
  }
}
