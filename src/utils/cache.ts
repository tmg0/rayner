import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

const RAYNER_CACHE = resolve(join(RAYNER_DIR, '.cache'))

export const storage = createStorage({ driver: fsDriver({ base: RAYNER_CACHE }) })

export const cache = {
  async set (key: any, value: any) {
    await storage.setItem(hash(key), JSON.stringify(value))
  },

  async get <T> (key: any) {
    const value = await storage.getItem(hash(key))
    return destr<T>(value)
  }
}
