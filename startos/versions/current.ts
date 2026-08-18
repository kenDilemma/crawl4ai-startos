import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.2:0',
  releaseNotes: {
    en_US:
      'Initial release for StartOS, wrapping Crawl4AI 0.9.2. See https://github.com/unclecode/crawl4ai/releases for upstream release notes.',
    es_ES:
      'Versión inicial para StartOS, que envuelve Crawl4AI 0.9.2. Consulta https://github.com/unclecode/crawl4ai/releases para las notas de la versión original.',
    de_DE:
      'Erstveröffentlichung für StartOS, die Crawl4AI 0.9.2 enthält. Siehe https://github.com/unclecode/crawl4ai/releases für die Upstream-Versionshinweise.',
    pl_PL:
      'Wydanie początkowe dla StartOS, zawierające Crawl4AI 0.9.2. Pełne notatki wydania: https://github.com/unclecode/crawl4ai/releases.',
    fr_FR:
      "Version initiale pour StartOS, intégrant Crawl4AI 0.9.2. Consultez https://github.com/unclecode/crawl4ai/releases pour les notes de version en amont.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
