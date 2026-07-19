// Arc Testnet Configuration
export const ARC_TESTNET = {
  id: 5042002,
  name: 'Arc Testnet',
  network: 'arc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.arc.network'],
      webSocket: ['wss://rpc.testnet.arc.network'],
    },
    public: {
      http: ['https://rpc.testnet.arc.network'],
      webSocket: ['wss://rpc.testnet.arc.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arc Explorer',
      url: 'https://testnet.arcscan.app',
    },
  },
  testnet: true,
}

// USDC Token Configuration on Arc Testnet
export const USDC_ARC = {
  address: '0x3600000000000000000000000000000000000000' as const,
  decimals: 6,
  name: 'USDC',
  symbol: 'USDC',
}

// Arc Testnet Faucet Info
export const ARC_FAUCET_URL = 'https://faucet.circle.com/'
export const ARC_EXPLORER_URL = 'https://testnet.arcscan.app'
