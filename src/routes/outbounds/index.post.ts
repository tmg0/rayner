export default eventHandler(async (event) => {
  const body: RaynerOutbound = await readBody(event)
  await store.ado(body)
  return {}
})
