export default eventHandler(async (event) => {
  const body: RaynerAdapter = await readBody(event)
  await store.rmo(body)
  return {}
})
