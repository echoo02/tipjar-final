/**
 * Circle CCTP (Cross-Chain Transfer Protocol) Configuration
 * Supports multiple testnet chains for cross-chain USDC transfers
 */

export interface CCTPChain {
  id: number
  name: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrl: string
  tokenMessenger: `0x${string}`
  messageTransmitter: `0x${string}`
  usdcAddress: `0x${string}`
  explorer: string
}

// CCTP Testnet Configuration
export const CCTP_CHAINS: Record<string, CCTPChain> = {
  // Arc Testnet (Source/Destination)
  arc: {
    id: 5042002,
    name: 'Arc Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://rpc.testnet.arc.network',
    tokenMessenger: '0x9f3b8679c73c2fef8b59c4aab94cad3456663a3a',
    messageTransmitter: '0x4d218452801fca6d0e6f1581a7fcdb77a75df09d',
    usdcAddress: '0x3600000000000000000000000000000000000000',
    explorer: 'https://testnet.arcscan.app',
  },
  // Ethereum Sepolia (Source/Destination)
  sepolia: {
    id: 11155111,
    name: 'Ethereum Sepolia',
    nativeCurrency: {
      name: 'Sepolia ETH',
      symbol: 'SEP',
      decimals: 18,
    },
    rpcUrl: 'https://rpc.sepolia.org',
    tokenMessenger: '0x9f3b8679c73c2fef8b59c4aab94cad3456663a3a',
    messageTransmitter: '0x26413e8157cd1675a20eb776142588e50142f08d',
    usdcAddress: '0x1c7d4b196cb0c6f69865f9eea2d4d0c16a5cfbb5',
    explorer: 'https://sepolia.etherscan.io',
  },
  // Polygon Mumbai (Source/Destination)
  mumbai: {
    id: 80001,
    name: 'Polygon Mumbai',
    nativeCurrency: {
      name: 'Mumbai MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    tokenMessenger: '0x9f3b8679c73c2fef8b59c4aab94cad3456663a3a',
    messageTransmitter: '0x7865fafc2db058fa78ef10276144ddd64e386b19',
    usdcAddress: '0x9999f7fea5938fd3b6ee6ef41191d1f1034f4784',
    explorer: 'https://mumbai.polygonscan.com',
  },
  // Optimism Goerli (Source/Destination)
  optimismGoerli: {
    id: 420,
    name: 'Optimism Goerli',
    nativeCurrency: {
      name: 'Goerli ETH',
      symbol: 'gETH',
      decimals: 18,
    },
    rpcUrl: 'https://goerli.optimism.io',
    tokenMessenger: '0x9f3b8679c73c2fef8b59c4aab94cad3456663a3a',
    messageTransmitter: '0x26413e8157cd1675a20eb776142588e50142f08d',
    usdcAddress: '0xfd064a18f3f145fe5dfe371b3265be31e3b51011',
    explorer: 'https://goerli-optimism.etherscan.io',
  },
}

// Get chain by ID
export function getChainById(chainId: number): CCTPChain | null {
  return Object.values(CCTP_CHAINS).find(chain => chain.id === chainId) || null
}

// Get available source chains (where user can send from)
export function getSourceChains(): CCTPChain[] {
  return Object.values(CCTP_CHAINS)
}

// Get available destination chains (where user can send to)
export function getDestinationChains(sourceChainId: number): CCTPChain[] {
  return Object.values(CCTP_CHAINS).filter(
    chain => chain.id !== sourceChainId
  )
}

// Circle Attestation Service
export const CIRCLE_ATTESTATION_API = 'https://iris-api-sandbox.circle.com'

// CCTP Messaging Domain IDs (for attestation)
export const MESSAGING_DOMAINS: Record<number, number> = {
  5042002: 5, // Arc
  11155111: 0, // Ethereum Sepolia
  80001: 4, // Polygon Mumbai
  420: 5, // Optimism Goerli
}
