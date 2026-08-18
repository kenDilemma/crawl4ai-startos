import { setApiToken } from '../actions/setApiToken'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchApiToken = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  const store = await storeJson.read().once()
  if (!store?.apiToken) {
    await sdk.action.createOwnTask(effects, setApiToken, 'critical', {
      reason: i18n('Set the API token before the service can start'),
    })
  }
})
