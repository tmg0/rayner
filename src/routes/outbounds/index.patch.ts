export default eventHandler(async (event) => {
  const body: RaynerAdapter = await readBody(event)
  const { enabled } = body
  await store?.[enabled ? 'eno' : 'diso'](body)
  return {}
})
