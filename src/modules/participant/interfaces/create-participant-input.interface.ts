export interface CreateParticipantInput {
  sessionId: string;
  name: string;
  speakLocale: string;
  listenLocale: string;
  speakCountry: string;
  listenCountry: string;
}