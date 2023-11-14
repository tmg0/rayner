export default eventHandler((event) => {
  appendCorsHeaders(event, { origin: '*' })
  appendCorsPreflightHeaders(event, { origin: '*' })
  return loadXrayConfig()
})
