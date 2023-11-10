export const setup = async () => {
  const port = await generateServerPort()
  const conf = await loadRaynerConfig()

  const exist = await existXrayCoreBin()

  if (!exist) {
    await downloadXrayCoreZip(conf)
    await unzipXrayCoreZip(conf)
  }

  await runXrayCore()

  const pid = await store.setup()

  return { port, pid }
}
