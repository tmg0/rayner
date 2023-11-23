export interface RaynerConfig {
  proxy: string
  xray: {
    version: string
  }
}

export interface RaynerOutbound {
  tag: string
  protocol: 'vmess' | 'shadowsocks'
  address: string
  port: number
  uuid?: string
  method?: string
  password?: string
  security?: string
  alterId?: number

  enabled?: boolean
  sort?: number
}

export interface XrayConfig {
  log: XrayLogConfig;
  inbounds: XrayInbound[];
  outbounds: XrayOutbound[];
  routing: XrayRoutingConfig;
}

export interface XrayLogConfig {
  loglevel: string;
}

export interface XrayInbound {
  tag: string;
  port: number;
  listen: string;
  protocol: 'vmess' | 'shadowsocks'
  sniffing: XraySniffingConfig;
  settings: XrayInboundSettings;
}

export interface XraySniffingConfig {
  enabled: boolean;
  destOverride: string[];
  metadataOnly: boolean;
}

export interface XrayInboundSettings {
  udpEnabled: boolean;
}

export interface XrayOutbound {
  tag: string;
  protocol: 'vmess' | 'shadowsocks'
  settings: XrayOutboundSettings;
}

export interface XrayOutboundSettings {
  vnext?: XrayVNextServer[];
  servers?: XrayShadowsocksServer[];
  response?: XrayHttpResponse;
}

export interface XrayVNextServer {
  address: string;
  port: number;
  users: XrayVNextUser[];
}

export interface XrayVNextUser {
  id: string;
  alterId: number;
  security: string;
}

export interface XrayShadowsocksServer {
  address: string;
  port: number;
  method: string;
  password: string;
}

export interface XrayHttpResponse {
  type: string;
}

export interface XrayRoutingConfig {
  domainStrategy: string;
  rules: XrayRule[];
  balancers: XrayBalancer[];
  observatory: XrayObservatoryConfig;
}

export interface XrayRule {
  type: string;
  inboundTag?: string[];
  outboundTag?: string;
  domain?: string[];
  ip?: string[];
  enabled: boolean;
  id?: string;
  ports?: string;
  balancerTag?: string;
  domains?: string[];
}

export interface XrayBalancer {
  tag: string;
  selector: string[];
  strategy: XrayStrategy;
}

export interface XrayStrategy {
  type: string;
}

export interface XrayObservatoryConfig {
  subjectSelector: string[];
  probeURL: string;
  probeInterval: string;
}
