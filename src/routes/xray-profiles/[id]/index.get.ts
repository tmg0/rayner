export default eventHandler((event) => {
  appendCorsHeaders(event, { origin: '*' })
  return loadXrayConfig()
})
