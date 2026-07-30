'use client'

import { WalletConnectButton } from '@/components/wallet-connect-button'
import { CreatorProfile } from '@/components/creator-profile'
import { TipForm } from '@/components/tip-form'
import { CrossChainTipForm } from '@/components/cross-chain-tip-form'
import { useAccount } from 'wagmi'
import { useParams } from 'next/navigation'
import { isAddress } from 'viem'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ARC_EXPLORER_URL } from '@/lib/arc-config'
import { useState } from 'react'

export default function CreatorPage() {
  const { address: creatorAddress } = useParams() as { address: string }
  const { address: connectedAddress } = useAccount()
  const [tipMode, setTipMode] = useState<'single' | 'cross-chain'>('single')

  // Validate address format
  if (!isAddress(creatorAddress)) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
        <div className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-sm font-bold text-white">💝</span>
                </div>
                <h1 className="text-xl font-bold">Tip Jar</h1>
              </div>
              <WalletConnectButton />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Invalid Address</h2>
            <p className="text-muted-foreground mb-6">
              The creator address is invalid
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-75">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-sm font-bold text-white">💝</span>
              </div>
              <h1 className="text-xl font-bold">Tip Jar</h1>
            </div>
            <WalletConnectButton />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CreatorProfile address={creatorAddress} />
          </div>

          <div>
            {creatorAddress.toLowerCase() === connectedAddress?.toLowerCase() ? (
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="text-muted-foreground">
                  This is your profile. You cannot tip yourself.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Tab Selection */}
                <div className="flex gap-2 rounded-lg border border-border bg-muted p-1">
                  <button
                    onClick={() => setTipMode('single')}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                      tipMode === 'single'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Single Chain
                  </button>
                  <button
                    onClick={() => setTipMode('cross-chain')}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                      tipMode === 'cross-chain'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Cross-Chain
                  </button>
                </div>

                {/* Forms */}
                {tipMode === 'single' ? (
                  <TipForm creatorAddress={creatorAddress} />
                ) : (
                  <CrossChainTipForm creatorAddress={creatorAddress} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
