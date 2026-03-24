export interface JoinSessionDto {
  sessionCode: string;
  participant: {
    name: string;
    speakLocale: string;
    listenLocale: string;
    speakCountry: string;
    listenCountry: string;
  };
}
