export interface ParticipantReaderPort {
  findById(id: string): Promise<
    | {
        id: string;
        name: string;
        speakLocale: string;
        listenLocale: string;
      }
    | undefined
  >;
}
