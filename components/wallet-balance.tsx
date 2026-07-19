'use client'

import { useAccount } from 'wagmi'
import { useUSDCBalance } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'

export function WalletBalance() {
  const { address, isConnected } = useAccount()
  const { balance: usdcBalance, isLoading: usdcLoading } =
    useUSDCBalance(address)

  if (!isConnected) {
    return null
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">USDC Balance</p>
          <p className="mt-2 text-3xl font-bold">
            {usdcLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              `${parseFloat(usdcBalance).toFixed(2)} USDC`
            )}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
          <span className="text-lg font-bold text-white">$</span>
        </div>
      </div>
    </div>
  )
}
