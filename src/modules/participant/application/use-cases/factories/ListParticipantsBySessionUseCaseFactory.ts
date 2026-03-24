import { IParticipantRepository } from '../../../domain/repositories/participant-repository.interface';
import { ListParticipantsBySessionUseCase } from '../list-participants-by-session.use-case';

export function ListParticipantsBySessionUseCaseFactory(
  participantRepository: IParticipantRepository,
): ListParticipantsBySessionUseCase {
  return new ListParticipantsBySessionUseCase(participantRepository);
}
