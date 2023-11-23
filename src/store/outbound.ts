import { loadXrayConfig } from '~/utils/xray'

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

  return s as RaynerOutbound
}

const parseRaynerToXray = (outbound: RaynerOutbound, { tag }: { tag: string }): XrayOutbound => {
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
  const proxies: Record<string, RaynerOutbound> = {}
  outbounds.forEach((outbound) => {
    const s = parseXrayToRayner(outbound)

    if (s.address) {
      proxies[s.address] = s
    }
  })
  return proxies
}

const syncXrayConfig = async () => {
  const outbounds: XrayConfig['outbounds'] = []
  const xrayConf = await loadXrayConfig()
  const _others = xrayConf.outbounds?.filter(({ protocol }) => !['vmess', 'shadowsocks'].includes(protocol)) ?? []
  const _cache = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)

  const _sorted = Object.values(_cache).sort((a, b) => {
    if (!a.index) { return 1 }
    if (!b.index) { return -1 }
    return a.index - b.index
  })

  _sorted.forEach((proxy, index) => {
    if (proxy.enabled) {
      const outbound = parseRaynerToXray(proxy, { tag: [proxy.protocol, index].join('-') })
      if (outbound) { outbounds.push(outbound) }
    }
  })

  xrayConf.outbounds = [...outbounds, ..._others]
  await rewriteXrayConfig(xrayConf)
  return await restartXrayCore()
}

export const outboundStore = {
  async setup () {
    const xrayConf = await loadXrayConfig()
    const outbounds = parseOutbounds(xrayConf)
    const _cache = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)
    await cache.set(STORAGE_OUTBOUNDS, defu(outbounds, _cache))
    return await syncXrayConfig()
  },

  async ado (proxy: RaynerOutbound | RaynerOutbound[]) {
    const _cache = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)

    if (Array.isArray(proxy)) {
      const _proxies = {}
      proxy.forEach((_p) => {
        _proxies[_p.address] = defu(_p, { enabled: true })
      })
      await cache.set(STORAGE_OUTBOUNDS, defu(_proxies, _cache))
    }

    if (!Array.isArray(proxy)) {
      await cache.set(STORAGE_OUTBOUNDS, defu({ [proxy.address]: defu(proxy, { enabled: true }) }, _cache))
    }

    return await syncXrayConfig()
  },

  async rmo (proxy: Partial<RaynerOutbound>) {
    const _cache = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)
    delete _cache[proxy.address]
    await cache.set(STORAGE_OUTBOUNDS, _cache)
    return await syncXrayConfig()
  },

  async puto (proxy: RaynerOutbound | RaynerOutbound[]) {
    const _cache = await cache.get<Record<string, RaynerOutbound>>(STORAGE_OUTBOUNDS)

    if (Array.isArray(proxy)) {
      proxy.forEach((_p) => {
        if (!_cache[_p.address]) { _cache[_p.address] = {} }
        _cache[_p.address] = defu(_p, _cache[_p.address])
      })
    }

    if (!Array.isArray(proxy)) {
      if (!_cache[proxy.address]) { _cache[proxy.address] = {} }
      _cache[proxy.address] = defu(proxy, _cache[proxy.address])
    }

    await cache.set(STORAGE_OUTBOUNDS, _cache)
    return await syncXrayConfig()
  },

  async eno ({ address }: { address: string }) {
    const value = await cache.get<RaynerOutbound>(address)
    value.enabled = true
    await cache.set(address, value)
    await syncXrayConfig()
  },

  async diso ({ address }: { address: string }) {
    const value = await cache.get<RaynerOutbound>(address)
    value.enabled = false
    await cache.set(address, value)
    await syncXrayConfig()
  }
}
