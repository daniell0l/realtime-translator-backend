import { ISessionRepository } from '../../repositories/session-repository.interface';
import { CreateSessionUseCase } from '../create-session.use-case';

export function CreateSessionUseCaseFactory(
  sessionRepository: ISessionRepository,
): CreateSessionUseCase {
  return new CreateSessionUseCase(sessionRepository);
}
