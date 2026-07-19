'use client'

import { useAccount, useBalance } from 'wagmi'
import { useUSDCBalance } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'

export function WalletBalance() {
  const { address, isConnected } = useAccount()
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
  })
  const { balance: usdcBalance, isLoading: usdcLoading } =
    useUSDCBalance(address)

  if (!isConnected) {
    return null
  }

  const isLoading = ethLoading || usdcLoading

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">ETH Balance</p>
            <p className="mt-2 text-2xl font-bold">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                `${parseFloat(ethBalance?.formatted || '0').toFixed(4)} ETH`
              )}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-sm font-bold text-white">Ξ</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">USDC Balance</p>
            <p className="mt-2 text-2xl font-bold">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                `${parseFloat(usdcBalance).toFixed(2)} USDC`
              )}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
            <span className="text-sm font-bold text-white">$</span>
          </div>
        </div>
      </div>
    </div>
  )
}
