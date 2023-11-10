export {}
declare global {
  const RAYNER_DIR: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['RAYNER_DIR']
  const XRAY_CORE_ARCHES: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['XRAY_CORE_ARCHES']
  const XRAY_CORE_BIN: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['XRAY_CORE_BIN']
  const XRAY_CORE_DIR: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['XRAY_CORE_DIR']
  const XRAY_CORE_PLATFOFMS: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['XRAY_CORE_PLATFOFMS']
  const XRAY_CORE_RELEASE: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/constants')['XRAY_CORE_RELEASE']
  const consola: typeof import('consola')['default']
  const defu: typeof import('defu')['defu']
  const downloadFromURL: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/common')['downloadFromURL']
  const downloadXrayCoreZip: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['downloadXrayCoreZip']
  const execXrayAsync: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['execXrayAsync']
  const existXrayCoreBin: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['existXrayCoreBin']
  const fse: typeof import('fs-extra')['default']
  const generateServerPort: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/common')['generateServerPort']
  const getRandomPort: typeof import('get-port-please')['getRandomPort']
  const join: typeof import('pathe')['join']
  const killProcessByPid: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/common')['killProcessByPid']
  const listen: typeof import('listhen')['listen']
  const parseFilename: typeof import('ufo')['parseFilename']
  const parseXrayCoreReleaseURL: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['parseXrayCoreReleaseURL']
  const readConfig: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/common')['readConfig']
  const resolve: typeof import('pathe')['resolve']
  const restartXrayCore: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['restartXrayCore']
  const runXrayCore: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['runXrayCore']
  const setup: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/setup')['setup']
  const startXrayCore: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['startXrayCore']
  const stopXrayCore: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['stopXrayCore']
  const testXrayConfig: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['testXrayConfig']
  const unzip: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/common')['unzip']
  const unzipXrayCoreZip: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['unzipXrayCoreZip']
  const validateConfig: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['validateConfig']
  const writeDefaltXrayConfig: typeof import('C:/Users/zekun.jin/Documents/Projects/rayner/src/utils/xray')['writeDefaltXrayConfig']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { RaynerConfig } from 'C:/Users/zekun.jin/Documents/Projects/rayner/src/types/index.ts'
}