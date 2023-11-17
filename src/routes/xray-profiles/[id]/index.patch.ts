interface Body {
  port: number
}

export default eventHandler(async (event) => {
  const body: Body = await readBody(event)
  const xrayConf = await loadXrayConfig()
  if (xrayConf.inbounds.length) {
    xrayConf.inbounds[0].port = body.port
  }
  await rewriteXrayConfig(xrayConf)
  await restartXrayCore()
  return {}
})
