export default eventHandler(async (event) => {
  const body: RaynerOutbound | RaynerOutbound[] = await readBody(event)
  await outboundStore.puto(body)
  return {}
})
