export class ChatMessageEntity {
  constructor(
    public id: string,
    public sessionId: string,
    public senderId: string,
    public senderName: string,
    public originalText: string,
    public translatedText: string,
    public sourceLocale: string,
    public targetLocale: string,
    public createdAt: Date,
  ) {}
}