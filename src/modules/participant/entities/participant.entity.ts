export class ParticipantEntity {
  constructor(
    public id: string,
    public sessionId: string,
    public name: string,
    public speakLocale: string,
    public listenLocale: string,
    public speakCountry: string,
    public listenCountry: string,
    public isOnline: boolean,
    public isMuted: boolean,
    public joinedAt: Date,
  ) {}
}