import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'
import { storeJson } from './fileModels/store.json'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  const store = await storeJson.read().const(effects)

  console.info(i18n('Starting Crawl4AI!'))

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  const crawl4aiSub = sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: 'outputs',
      mountpoint: '/var/lib/crawl4ai/outputs',
      readonly: false,
    }),
    'crawl4ai-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('ensure-permissions', {
      subcontainer: crawl4aiSub,
      exec: {
        command: ['chown', '-R', 'appuser:appuser', '/var/lib/crawl4ai/outputs'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: crawl4aiSub,
      exec: {
        // The image has no ENTRYPOINT (only `CMD ["bash", "entrypoint.sh"]`), so the
        // command is explicit. supervisord (spawned by entrypoint.sh) must run as
        // PID 1, hence `runAsInit: true`.
        command: ['bash', '/app/entrypoint.sh'],
        runAsInit: true,
        env: {
          // entrypoint.sh binds gunicorn to 127.0.0.1 ONLY when no credential is
          // set — the token (set via the "Set API Token" action) makes it listen
          // on all interfaces so the StartOS proxy can reach it.
          CRAWL4AI_API_TOKEN: store?.apiToken ?? '',
        },
      },
      ready: {
        display: i18n('Crawl4AI API'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The Crawl4AI API is ready'),
            errorMessage: i18n('The Crawl4AI API is not ready'),
          }),
      },
      requires: ['ensure-permissions'],
    })
})
