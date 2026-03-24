import { SessionEntity } from '../../domain/entities/session.entity';
import { ISessionRepository } from '../../domain/repositories/session-repository.interface';

export class FindSessionByIdUseCase {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  execute(id: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findById(id);
  }
}
