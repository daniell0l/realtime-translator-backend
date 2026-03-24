import { SessionMode } from '../types/session-mode';
import { SessionStatus } from '../types/session-status';

export class SessionEntity {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly mode: SessionMode,
    public readonly status: SessionStatus,
    public readonly createdAt: Date,
  ) {}
}
