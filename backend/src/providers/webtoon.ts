export interface WebtoonProvider {
  isConfigured(): boolean;
  getSeries(seriesId: string): Promise<Record<string, unknown> | null>;
}

export class ConsoleWebtoonProvider implements WebtoonProvider {
  isConfigured(): boolean {
    return false;
  }

  async getSeries(_seriesId: string): Promise<null> {
    return null;
  }
}

let _provider: WebtoonProvider | null = null;

export function getWebtoonProvider(): WebtoonProvider {
  if (_provider) return _provider;
  _provider = new ConsoleWebtoonProvider();
  return _provider;
}
