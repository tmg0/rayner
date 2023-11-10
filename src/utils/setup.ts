export const setup = async () => {
  const port = await generateServerPort()
  const conf = await readConfig()

  const exist = await existXrayCoreBin()

  if (!exist) {
    await downloadXrayCoreZip(conf)
    await unzipXrayCoreZip(conf)
  }

  const pid = await runXrayCore()

  return { port, pid }
}
