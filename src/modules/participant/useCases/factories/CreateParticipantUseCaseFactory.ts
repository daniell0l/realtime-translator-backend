import { IParticipantRepository } from '../../repositories/participant-repository.interface';
import { CreateParticipantUseCase } from '../create-participant.use-case';

export function CreateParticipantUseCaseFactory(
  participantRepository: IParticipantRepository,
): CreateParticipantUseCase {
  return new CreateParticipantUseCase(participantRepository);
}
