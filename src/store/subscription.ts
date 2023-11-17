export interface Subscription {
  link: string
}

export const subscriptionStore = {
  async ads ({ link }: Subscription) {
    const _cache = await cache.get<Record<string, Subscription>>(STORAGE_SUBSCRIPTIONS)
    if (_cache?.[link]) { return }
    await cache.set(STORAGE_SUBSCRIPTIONS, defu({ [link]: { link } }, _cache))
  }
}
