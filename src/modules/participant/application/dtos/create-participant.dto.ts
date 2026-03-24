export interface CreateParticipantDto {
  sessionId: string;
  name: string;
  speakLocale: string;
  listenLocale: string;
  speakCountry: string;
  listenCountry: string;
}
