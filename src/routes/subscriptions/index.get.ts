export default eventHandler(async () => {
  const subscriptions = await cache.get<Record<string, Subscription>>(STORAGE_SUBSCRIPTIONS)
  return Object.values(subscriptions)
})
