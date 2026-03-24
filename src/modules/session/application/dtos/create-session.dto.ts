import { SessionMode } from '../../domain/value-objects/session-mode';

export interface CreateSessionDto {
  mode: SessionMode;
}
