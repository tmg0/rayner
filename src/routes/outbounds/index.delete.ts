export default eventHandler(async (event) => {
  appendCorsHeaders(event, { origin: '*' })
  const body: RaynerOutbound = await readBody(event)
  await outboundStore.rmo(body)
  return {}
})
