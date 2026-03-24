import { SessionEntity } from '../entities/session.entity';
import { ISessionRepository } from '../repositories/session-repository.interface';

export class FindSessionByIdUseCase {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  execute(id: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findById(id);
  }
}
