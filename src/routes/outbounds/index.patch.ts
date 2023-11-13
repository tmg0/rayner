export default eventHandler(async (event) => {
  appendCorsHeaders(event, { origin: '*' })
  const body: RaynerOutbound = await readBody(event)
  const { enabled } = body
  await outboundStore?.[enabled ? 'eno' : 'diso'](body)
  return {}
})
