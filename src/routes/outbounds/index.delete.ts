export default eventHandler(async (event) => {
  appendCorsHeaders(event, { origin: '*' })
  const body: RaynerOutbound = await readBody(event)
  await store.rmo(body)
  return {}
})
