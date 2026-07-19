import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { ARC_TESTNET } from './arc-config'

export const config = getDefaultConfig({
  appName: 'Tip Jar',
  projectId: '2daec776cb81d7054e61c88d8e8e0482',
  chains: [ARC_TESTNET],
  transports: {
    [ARC_TESTNET.id]: http(),
  },
  ssr: true,
})
