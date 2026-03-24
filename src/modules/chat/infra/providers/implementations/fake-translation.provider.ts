import { TranslationProvider } from '../../../application/ports/translation.provider';

export class FakeTranslationProvider implements TranslationProvider {
  async translate(input: {
    text: string;
    from: string;
    to: string;
  }): Promise<{ translatedText: string }> {
    return {
      translatedText: `[${input.from} -> ${input.to}] ${input.text}`,
    };
  }
}
