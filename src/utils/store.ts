import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import { loadXrayConfig } from './xray'

const RAYNER_CACHE = resolve(join(RAYNER_DIR, '.cache'))

export const storage = createStorage({ driver: fsDriver({ base: RAYNER_CACHE }) })

const parseXrayToRayner = (outbound: XrayOutbound, defaults: { enabled: boolean } = { enabled: true }) => {
  const s: Record<string, any> = defu({ protocol: outbound.protocol }, defaults, { enabled: true })

  if (outbound.protocol === 'vmess') {
    s.address = outbound.settings.vnext[0].address
    s.port = outbound.settings.vnext[0].port
    s.uuid = outbound.settings.vnext[0].users[0].id
    s.alterId = outbound.settings.vnext[0].users[0].alterId
  }

  if (outbound.protocol === 'shadowsocks') {
    s.address = outbound.settings.servers[0].address
    s.port = outbound.settings.servers[0].port
    s.uuid = outbound.settings.servers[0].method
    s.password = outbound.settings.servers[0].password
  }

  return s as RaynerAdapter
}

const parseRaynerToXray = (outbound: RaynerAdapter, { tag }: { tag: string }): XrayOutbound => {
  if (outbound.protocol === 'vmess') {
    return {
      tag,
      protocol: 'vmess',
      settings: {
        vnext: [
          {
            address: outbound.address,
            port: outbound.port,
            users: [
              {
                id: outbound.uuid,
                alterId: 0,
                security: 'auto'
              }
            ]
          }
        ]
      }
    }
  }

  if (outbound.protocol === 'shadowsocks') {
    return {
      tag,
      protocol: 'shadowsocks',
      settings: {
        servers: [
          {
            address: outbound.address,
            port: outbound.port,
            method: outbound.method,
            password: outbound.password
          }
        ]
      }
    }
  }
}

const parseOutbounds = ({ outbounds }: Partial<XrayConfig>) => {
  if (!outbounds) { return [] }
  const proxies: Record<string, RaynerAdapter> = {}
  outbounds.forEach((outbound) => {
    const s = parseXrayToRayner(outbound)

    if (s.address) {
      proxies[s.address] = s
    }
  })
  return proxies
}

export const cache = {
  async set (key: any, value: any) {
    await storage.setItem(hash(key), JSON.stringify(value))
  },

  async get <T> (key: any) {
    const value = await storage.getItem(hash(key))
    return destr<T>(value)
  }
}

const syncXrayConfig = async () => {
  const outbounds: XrayConfig['outbounds'] = []
  const xrayConf = await loadXrayConfig()
  const _others = xrayConf.outbounds?.filter(({ protocol }) => !['vmess', 'shadowsocks'].includes(protocol)) ?? []
  const _cache = await cache.get<Record<string, RaynerAdapter>>(STORAGE_OUTBOUNDS)
  Object.values(_cache).forEach((proxy, index) => {
    if (proxy.enabled) {
      const outbound = parseRaynerToXray(proxy, { tag: [proxy.protocol, index].join('-') })
      if (outbound) { outbounds.push(outbound) }
    }
  })
  xrayConf.outbounds = [...outbounds, ..._others]
  await rewriteXrayConfig(xrayConf)
  return await restartXrayCore()
}

export const store = {
  async setup () {
    const xrayConf = await loadXrayConfig()
    const outbounds = parseOutbounds(xrayConf)
    const _cache = await cache.get<Record<string, RaynerAdapter>>(STORAGE_OUTBOUNDS)
    await cache.set(STORAGE_OUTBOUNDS, defu(outbounds, _cache))
    return await syncXrayConfig()
  },

  async ado (proxy: RaynerAdapter) {
    const _cache = await cache.get<Record<string, RaynerAdapter>>(STORAGE_OUTBOUNDS)
    await cache.set(STORAGE_OUTBOUNDS, defu({ [proxy.address]: defu(proxy, { enabled: true }) }, _cache))
    return await syncXrayConfig()
  },

  async rmo (proxy: Partial<RaynerAdapter>) {
    const _cache = await cache.get<Record<string, RaynerAdapter>>(STORAGE_OUTBOUNDS)
    delete _cache[proxy.address]
    await cache.set(STORAGE_OUTBOUNDS, _cache)
    return await syncXrayConfig()
  },

  async eno ({ address }: { address: string }) {
    const value = await cache.get<RaynerAdapter>(address)
    value.enabled = true
    await cache.set(address, value)
    await syncXrayConfig()
  },

  async diso ({ address }: { address: string }) {
    const value = await cache.get<RaynerAdapter>(address)
    value.enabled = false
    await cache.set(address, value)
    await syncXrayConfig()
  }
}
