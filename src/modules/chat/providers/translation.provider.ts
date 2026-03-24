export interface TranslationProvider {
  translate(input: {
    text: string;
    from: string;
    to: string;
  }): Promise<{ translatedText: string }>;
}
