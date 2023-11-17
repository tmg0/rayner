import { pipeline } from 'stream/promises'
import { kill } from 'node:process'
import AdmZip from 'adm-zip'
import { join } from 'pathe'
import { parseFilename } from 'ufo'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { loadConfig } from 'c12'

interface DownloadFromURLOptions {
  output: string
  proxy?: string
}

export const loadRaynerConfig = async () => {
  const { config } = await loadConfig<RaynerConfig>({ name: 'rayner' })
  return defu(config, { xray: { version: '1.8.4' } })
}

export const downloadFromURL = async (url: string, options: DownloadFromURLOptions) => {
  let agent: any
  if (options.proxy) {
    agent = new HttpsProxyAgent(options.proxy)
  }
  const { body } = await fetch(url, { agent } as any)

  await fse.ensureDir(options.output)
  const filename = parseFilename(url, { strict: true })
  const exist = await fse.pathExists(join(options.output, filename))
  if (exist) { return }
  const stream = fse.createWriteStream(join(options.output, filename))
  await pipeline(body as any, stream)
}

export const unzip = async (path: string, options: { output: string }) => {
  await fse.ensureDir(options.output)
  const zip = new AdmZip(path)
  zip.extractAllTo(options.output, true)
}

export const generateServerPort = async ({ output }: { output: string } = { output: RAYNER_DIR }) => {
  const port = await getRandomPort()
  const path = join(output, 'rayner.port')
  await fse.ensureFile(path)
  await fse.outputFile(path, String(port))
  return port
}

export const terminateProcessByPid = (pid: number | string) => {
  try {
    kill(Number(pid), 'SIGTERM')
  } catch (error) {
    consola.warn(error)
  }
}
