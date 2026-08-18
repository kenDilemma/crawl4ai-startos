const dict = {
  // main.ts
  'Starting Crawl4AI!': 0,
  'Crawl4AI API': 1,
  'Your Crawl4AI API is ready': 2,
  'Error launching your Crawl4AI API': 3,
  // interfaces.ts
  'Your Crawl4AI API': 4,
  // actions/setApiToken.ts
  'Set API Token': 5,
  'Generate a new random API token for the Crawl4AI API. Replaces any existing token.': 6,
  'API Token': 7,
  'Use this token as a Bearer token when calling the Crawl4AI API.': 8,
  // init/watchCredentials.ts
  'Set the API token before the service can start': 9,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>

export const DEFAULT_LANG = 'en_US'

export default dict