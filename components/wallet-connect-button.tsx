'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export function WalletConnectButton() {
  const { isConnected } = useAccount()

  return (
    <div className="flex justify-end">
      <ConnectButton />
    </div>
  )
}

export function WalletInfo() {
  const { address, isConnected } = useAccount()

  if (!isConnected || !address) {
    return null
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">Connected Wallet</p>
      <p className="font-mono text-sm font-medium">
        {address.slice(0, 6)}...{address.slice(-4)}
      </p>
    </div>
  )
}
