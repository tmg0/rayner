import os from 'node:os'

export const XRAY_CORE_RELEASE = 'https://github.com/XTLS/Xray-core/releases/download'
export const XRAY_CORE_PLATFOFMS = { win32: 'windows', darwin: 'macos' }
export const XRAY_CORE_ARCHES = { x64: '64', arm64: 'arm64' }
export const XRAY_CORE_BIN = os.platform() === 'win32' ? 'xray.exe' : 'xray'
export const XRAY_CORE_DIR = '.xray'

export const RAYNER_DIR = '.rayner'
