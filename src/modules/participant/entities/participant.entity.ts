export class ParticipantEntity {
  constructor(
    public readonly id: string,
    public readonly sessionId: string,
    public readonly name: string,
    public readonly speakLocale: string,
    public readonly listenLocale: string,
    public readonly speakCountry: string,
    public readonly listenCountry: string,
    public readonly isOnline: boolean,
    public readonly isMuted: boolean,
    public readonly joinedAt: Date,
  ) {}
}
