import { setupInterfaces } from '@start9labs/start-sdk'

export const interfaces = setupInterfaces(async ({ sdk }) => {
  const api = sdk.interfaces.add({
    id: 'api',
    name: 'Crawl4AI API',
    description: 'The Crawl4AI REST API for web crawling and scraping.',
    lan: {
      port: 11235,
      protocol: 'http',
    },
    ui: false, // No web UI, just an API
  })

  return sdk.interfaces({
    interfaces: [api],
  })
})
