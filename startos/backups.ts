import { setupBackups } from '@start9labs/start-sdk'

export const backups = setupBackups(async ({ sdk }) => {
  return sdk.Backups.ofVolumes('main')
})
