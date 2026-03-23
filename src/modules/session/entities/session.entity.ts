import { SessionMode } from '../../../shared/types/session-mode';
import { SessionStatus } from '../../../shared/types/session-status';

export class SessionEntity {
  constructor(
    public id: string,
    public code: string,
    public mode: SessionMode,
    public status: SessionStatus,
    public createdAt: Date,
  ) {}
}