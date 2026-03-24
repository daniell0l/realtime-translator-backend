import { ISessionRepository } from '../../repositories/session-repository.interface';
import { FindSessionByCodeUseCase } from '../find-session-by-code.use-case';

export function FindSessionByCodeUseCaseFactory(
  sessionRepository: ISessionRepository,
): FindSessionByCodeUseCase {
  return new FindSessionByCodeUseCase(sessionRepository);
}
