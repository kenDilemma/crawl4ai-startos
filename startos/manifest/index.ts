import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'crawl4ai',
  title: 'Crawl4AI',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/crawl4ai-startos',
  upstreamRepo: 'https://github.com/unclecode/crawl4ai',
  marketingUrl: 'https://crawl4ai.com/',
  donationUrl: null,
  description: {
    short: 'Powerful, local web crawling and scraping for AI.',
    long: 'Crawl4AI is a high-performance web crawling and scraping tool designed for AI agents. It provides clean markdown output, media extraction, and advanced crawling strategies.',
  },
  volumes: ['main'],
  images: {
    'main': {
      source: { dockerTag: 'unclecode/crawl4ai:latest' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
