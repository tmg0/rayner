export default eventHandler(async () => {
  const outbounds = await cache.get<Record<string, RaynerAdapter>>(STORAGE_OUTBOUNDS)
  return Object.values(outbounds)
})
