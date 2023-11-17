export default eventHandler(async () => {
  await stopXrayCore()
  process.exit(0)
})
