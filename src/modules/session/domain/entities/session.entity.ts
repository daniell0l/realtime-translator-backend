import { SessionMode } from '../value-objects/session-mode';
import { SessionStatus } from '../value-objects/session-status';

export class SessionEntity {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly mode: SessionMode,
    public readonly status: SessionStatus,
    public readonly createdAt: Date,
  ) {}
}
