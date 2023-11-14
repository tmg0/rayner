export default eventHandler(async (event) => {
  appendCorsHeaders(event, { origin: '*' })
  appendCorsPreflightHeaders(event, { origin: '*' })
  const outbounds = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)
  return Object.values(outbounds)
})
