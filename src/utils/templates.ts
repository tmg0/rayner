export const defaultXrayConfig = {
  log: {
    loglevel: 'warning'
  },
  inbounds: [
    {
      tag: 'http',
      port: 1080,
      listen: '0.0.0.0',
      protocol: 'http',
      sniffing: {
        enabled: true,
        destOverride: [
          'http',
          'tls',
          'quic',
          'fakedns',
          'fakedns+others'
        ],
        metadataOnly: true
      },
      settings: {
        udpEnabled: true
      }
    }
  ],
  outbounds: [
    {
      tag: 'direct',
      protocol: 'freedom',
      settings: {}
    },
    {
      tag: 'block',
      protocol: 'blackhole',
      settings: {
        response: {
          type: 'http'
        }
      }
    }
  ],
  routing: {
    domainStrategy: 'AsIs',
    rules: [
      {
        type: 'field',
        inboundTag: [
          'api'
        ],
        outboundTag: 'api',
        enabled: true
      },
      {
        id: '5270856235503876760',
        type: 'field',
        outboundTag: 'direct',
        domain: [
          'domain:example-example.com',
          'domain:example-example2.com'
        ],
        enabled: true
      },
      {
        id: '5759742903813008347',
        type: 'field',
        outboundTag: 'block',
        domain: [
          'geosite:category-ads-all'
        ],
        enabled: true
      },
      {
        id: '4894384323742169592',
        type: 'field',
        outboundTag: 'direct',
        domain: [
          'geosite:cn'
        ],
        enabled: true
      },
      {
        id: '5729556669620987944',
        type: 'field',
        outboundTag: 'direct',
        ip: [
          'geoip:private',
          'geoip:cn'
        ],
        enabled: true
      },
      {
        id: '4945167512436168377',
        type: 'field',
        port: '0-65535',
        balancerTag: 'proxy',
        enabled: true
      }
    ],
    balancers: [
      {
        tag: 'proxy',
        selector: ['rayner'],
        strategy: {
          type: 'leastPing'
        }
      }
    ],
    observatory: {
      subjectSelector: ['rayner'],
      probeURL: 'https://www.google.com/generate_204',
      probeInterval: '1m'
    }
  }
}

export const proxyXrayConfig = {
  log: {
    loglevel: 'warning'
  },
  inbounds: [
    {
      tag: 'http',
      port: 1080,
      listen: '0.0.0.0',
      protocol: 'http',
      sniffing: {
        enabled: true,
        destOverride: [
          'http',
          'tls',
          'quic',
          'fakedns',
          'fakedns+others'
        ],
        metadataOnly: true
      },
      settings: {
        udpEnabled: true
      }
    }
  ],
  outbounds: [
    {
      tag: 'direct',
      protocol: 'freedom',
      settings: {}
    },
    {
      tag: 'block',
      protocol: 'blackhole',
      settings: {
        response: {
          type: 'http'
        }
      }
    }
  ],
  routing: {
    domainStrategy: 'AsIs',
    rules: [
      {
        type: 'field',
        inboundTag: [
          'api'
        ],
        outboundTag: 'api',
        enabled: true
      },
      {
        id: '4945167512436168377',
        type: 'field',
        port: '0-65535',
        balancerTag: 'proxy',
        enabled: true
      }
    ],
    balancers: [
      {
        tag: 'proxy',
        selector: ['rayner'],
        strategy: {
          type: 'leastPing'
        }
      }
    ],
    observatory: {
      subjectSelector: ['rayner'],
      probeURL: 'https://www.google.com/generate_204',
      probeInterval: '1m'
    }
  }
}
