import { IParticipantRepository } from '../../repositories/participant-repository.interface';
import { ListParticipantsBySessionUseCase } from '../list-participants-by-session.use-case';

export function ListParticipantsBySessionUseCaseFactory(
  participantRepository: IParticipantRepository,
): ListParticipantsBySessionUseCase {
  return new ListParticipantsBySessionUseCase(participantRepository);
}
