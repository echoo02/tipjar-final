'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useUSDCBalance } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'

export function WalletConnectButton() {
  const { isConnected, address } = useAccount()
  const { balance: usdcBalance, isLoading } = useUSDCBalance(address)

  return (
    <div className="flex items-center justify-end gap-4">
      {isConnected && (
        <div className="rounded-lg bg-muted px-4 py-2 text-sm font-medium">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin inline" />
          ) : (
            <span>USDC: {parseFloat(usdcBalance).toFixed(2)}</span>
          )}
        </div>
      )}
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
