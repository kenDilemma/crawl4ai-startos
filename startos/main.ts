import { i18n } from './i18n'
import { sdk } from './sdk'
import { port } from './utils'
import { storeJson } from './fileModels/store.json'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   */
  console.info(i18n('Starting Crawl4AI!'))

  const store = await storeJson.read().once()

  /**
   * ======================== Daemons ========================
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'crawl4ai' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/app/data',
        readonly: false,
      }),
      'crawl4ai-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      env: store?.apiToken ? { CRAWL4AI_API_TOKEN: store.apiToken } : {},
    },
    ready: {
      display: i18n('Crawl4AI API'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, port, {
          successMessage: i18n('Your Crawl4AI API is ready'),
          errorMessage: i18n('Error launching your Crawl4AI API'),
        }),
    },
    requires: [],
  })
})