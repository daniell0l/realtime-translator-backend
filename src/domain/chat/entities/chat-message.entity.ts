export class ChatMessageEntity {
  constructor(
    public readonly id: string,
    public readonly sessionId: string,
    public readonly senderId: string,
    public readonly senderName: string,
    public readonly originalText: string,
    public readonly translatedText: string,
    public readonly sourceLocale: string,
    public readonly targetLocale: string,
    public readonly createdAt: Date,
  ) {}
}
