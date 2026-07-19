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
      url: 'https://explorer.testnet.arc.network',
    },
  },
  testnet: true,
}

// USDC Token Configuration on Arc Testnet
export const USDC_ARC = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  decimals: 6,
  name: 'USDC',
  symbol: 'USDC',
}

// Arc Testnet Faucet Info
export const ARC_FAUCET_URL = 'https://faucet.testnet.arc.network'
export const ARC_EXPLORER_URL = 'https://explorer.testnet.arc.network'
