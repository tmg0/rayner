import os from 'node:os'
import { spawn, exec } from 'node:child_process'
import { resolve } from 'pathe'

const XRAY_CORE = resolve(join(XRAY_CORE_DIR, XRAY_CORE_BIN))
const XRAY_CONFIG = resolve(join(XRAY_CORE_DIR, 'config.json'))

export const downloadXrayCoreZip = async (conf: RaynerConfig) => {
  const release = parseXrayCoreReleaseURL(conf)
  await downloadFromURL(release, { proxy: conf.proxy, output: XRAY_CORE_DIR })
}

export const unzipXrayCoreZip = async (conf: RaynerConfig) => {
  const release = parseXrayCoreReleaseURL(conf)
  const filename = parseFilename(release, { strict: true })
  await unzip(join(XRAY_CORE_DIR, filename), { output: XRAY_CORE_DIR })
  await fse.remove(join(XRAY_CORE_DIR, filename))
}

export const existXrayCoreBin = () => {
  return fse.pathExists(XRAY_CORE)
}

export const parseXrayCoreReleaseURL = ({ xray }: RaynerConfig) => {
  const _platform = os.platform()
  const _arch = os.arch()
  const plarform = XRAY_CORE_PLATFOFMS?.[_platform] ?? _platform
  const arch = XRAY_CORE_ARCHES?.[_arch] ?? _arch

  return `${XRAY_CORE_RELEASE}/v${xray.version}/Xray-${plarform}-${arch}.zip`
}

export const runXrayCore = async () => {
  const valid = await validateConfig()
  if (!valid) { await writeDefaltXrayConfig() }
  const { pid } = spawn(XRAY_CORE, ['run', '-c', XRAY_CONFIG])
  const pidPath = join(RAYNER_DIR, 'xray.pid')
  await fse.ensureFile(pidPath)
  await fse.outputFile(pidPath, String(pid))
  return pid
}

export const startXrayCore = runXrayCore

export const stopXrayCore = async () => {
  const pidPath = join(RAYNER_DIR, 'xray.pid')
  fse.ensureFile(pidPath)
  const pid = await fse.readFile(pidPath)
  if (!pid) { return }
  killProcessByPid(pid)
}

export const restartXrayCore = async () => {
  await stopXrayCore()
  await startXrayCore()
}

export const writeDefaltXrayConfig = async () => {
  const path = join(XRAY_CORE_DIR, 'config.json')
  await fse.outputJson(path, {})
}

export const validateConfig = async (path: string = join(XRAY_CORE_DIR, 'config.json')) => {
  const exist = await fse.pathExists(path)
  if (!exist) { return false }
  return testXrayConfig()
}

export const testXrayConfig = async () => {
  try {
    const stdout = await execXrayAsync('-test')
    return stdout.includes('Configuration OK')
  } catch (error) {
    return false
  }
}

export const execXrayAsync = (cmd: string, options: { stdout: boolean } = { stdout: false }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const p = exec(`${XRAY_CORE} ${cmd}`, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })

    if (options.stdout) {
      p.stdout?.pipe(process.stdout)
    }
  })
}
