import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'crawl4ai',
  title: 'Crawl4AI',
  license: 'MIT',
  packageRepo: 'https://github.com/kenDilemma/crawl4ai-startos',
  upstreamRepo: 'https://github.com/unclecode/crawl4ai',
  marketingUrl: 'https://docs.crawl4ai.com/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: { dockerTag: 'unclecode/crawl4ai:0.9.2' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
