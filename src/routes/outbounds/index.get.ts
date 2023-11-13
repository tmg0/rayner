export default eventHandler(async () => {
  const outbounds = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)
  return Object.values(outbounds)
})
