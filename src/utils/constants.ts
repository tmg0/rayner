import os from 'node:os'
import process from 'node:process'

export const EXEC_DIR = dirname(process.execPath)

export const XRAY_CORE_RELEASE = 'https://github.com/XTLS/Xray-core/releases/download'
export const XRAY_CORE_PLATFOFMS = { win32: 'windows', darwin: 'macos' }
export const XRAY_CORE_ARCHES = { x64: '64', arm64: 'arm64' }
export const XRAY_CORE_BIN = os.platform() === 'win32' ? 'xray.exe' : 'xray'
export const XRAY_CORE_DIR = join(EXEC_DIR, '.xray')

export const RAYNER_DIR = join(EXEC_DIR, '.rayner')

export const STORAGE_OUTBOUNDS = 'outbounds'
export const STORAGE_SUBSCRIPTIONS = 'subscriptions'
