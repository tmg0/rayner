export default eventHandler(async (event) => {
  const body: RaynerOutbound = await readBody(event)
  await store.rmo(body)
  return {}
})
