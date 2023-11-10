export default eventHandler(async (event) => {
  const body: RaynerAdapter = await readBody(event)
  await store.eno(body)
  return {}
})
