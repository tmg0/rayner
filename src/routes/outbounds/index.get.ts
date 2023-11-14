export default eventHandler(async (event) => {
  const outbounds = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)
  return Object.values(outbounds)
})
