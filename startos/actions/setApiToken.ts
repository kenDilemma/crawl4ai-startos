import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const setApiToken = sdk.Action.withoutInput(
  'set-api-token',
  async () => ({
    name: i18n('Set API Token'),
    description: i18n(
      'Generate a new random API token for the Crawl4AI API. Replaces any existing token.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    // `'enabled'` keeps the action reachable from the Actions tab so the user
    // can rotate the token later.
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const apiToken = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    await storeJson.merge(effects, { apiToken })

    return {
      version: '1',
      title: i18n('API Token'),
      message: i18n('Use this token as a Bearer token when calling the Crawl4AI API.'),
      result: {
        type: 'single',
        name: i18n('API Token'),
        description: null,
        value: apiToken,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
