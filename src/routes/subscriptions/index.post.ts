import https from 'https'
import { request, Agent } from 'undici'
import { version } from '~~/package.json'

const VMESS_PREFIX = 'vmess://'
const SS_PREFIX = 'ss://'

interface Vmess {
  ps: string
  port: string
  id: string
  aid: number
  net: string
  type: string
  tls: string
  add: string
}

const isVmess = (address: string) => address.startsWith(VMESS_PREFIX)
const isShadowsocks = (address: string) => address.startsWith(SS_PREFIX)

const parseVmess = (address: string): RaynerOutbound => {
  const decode = atob(address.replace(VMESS_PREFIX, ''))
  const conf = destr<Vmess>(decode)
  return {
    protocol: 'vmess',
    address: conf.add,
    port: Number(conf.port),
    uuid: conf.id,
    security: 'auto',
    alterId: conf.aid
  }
}

const parseShadowsocks = (address: string): RaynerOutbound => {
  const [encode] = address.replace(SS_PREFIX, '').split('#')
  const [method, _, port] = atob(encode).split(':')
  const [password, server] = _.split('@')

  return {
    protocol: 'shadowsocks',
    address: server,
    password,
    method,
    port: Number(port)
  }
}

export default eventHandler(async (event) => {
  const body = await readBody(event)
  await subscriptionStore.ads(body)

  const headers = { 'User-Agent': `Rayner/${version}` }

  const { body: response } = await request(body.link, {
    headers,
    dispatcher: new Agent({
      connect: { rejectUnauthorized: false }
    })
  })

  const decode = await response.text()
  const encode = atob(decode)

  const proxies = encode.split(/[\n\r]/).filter(Boolean).flat()

  const outbounds: RaynerOutbound[] = proxies.map((proxy) => {
    if (isVmess(proxy)) { return parseVmess(proxy) }
    if (isShadowsocks(proxy)) { return parseShadowsocks(proxy) }
    return undefined
  }).filter(Boolean)

  await outboundStore.ado(outbounds)

  return {}
})
