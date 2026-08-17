import { setupMain } from '@start9labs/start-sdk'

export const main = setupMain(async ({ sdk, config }) => {
  const daemon = sdk.daemons.add({
    id: 'main',
    image: 'main',
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        'CRAWL4AI_API_TOKEN': '', // Optional: add auth if needed
      },
    },
    mounts: sdk.Mounts.of().addVolume('main', '/app/data'),
    ready: {
      display: 'Crawl4AI is ready',
      trigger: sdk.trigger.statusTrigger({
        success: 30000, // Check every 30s once healthy
      }),
    },
  })

  const health = sdk.health.add({
    id: 'api',
    name: 'API Health',
    check: sdk.health.checks.http({
      id: 'main',
      port: 11235,
      path: '/health',
    }),
  })

  return sdk.main({
    daemons: [daemon],
    health: [health],
  })
})
