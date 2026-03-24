import { SessionEntity } from '../../domain/entities/session.entity';
import { ISessionRepository } from '../../domain/repositories/session-repository.interface';

export class FindSessionByCodeUseCase {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  execute(code: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findByCode(code);
  }
}
