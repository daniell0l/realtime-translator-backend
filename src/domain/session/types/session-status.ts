const SESSION_STATUS = ['waiting', 'active', 'ended'] as const;

export type SessionStatus = (typeof SESSION_STATUS)[number];
