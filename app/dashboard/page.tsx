'use client'

import { WalletConnectButton } from '@/components/wallet-connect-button'
import { WalletBalance } from '@/components/wallet-balance'
import { CreatorProfile } from '@/components/creator-profile'
import { TipForm } from '@/components/tip-form'
import { useAccount } from 'wagmi'
import { Loader2, Search } from 'lucide-react'
import { useState } from 'react'
import { isAddress } from 'viem'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [searchAddress, setSearchAddress] = useState('')
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAddress(searchAddress)) {
      setSelectedCreator(searchAddress)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
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
        {!isConnected ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Please connect a Web3 wallet to use Tip Jar
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Wallet Info Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Wallet</h2>
              <WalletBalance />
            </div>

            {/* Your Profile Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Creator Profile</h2>
              <CreatorProfile address={address!} showEditButton={true} />
            </div>

            {/* Search & Tip Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Send Tips</h2>

              <form onSubmit={handleSearch} className="rounded-lg border border-border bg-card p-6">
                <label className="block text-sm font-medium mb-3">
                  Creator Wallet Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter creator's wallet address..."
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </form>

              {selectedCreator && selectedCreator !== address && (
                <div className="space-y-4">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <CreatorProfile address={selectedCreator} />
                    <TipForm creatorAddress={selectedCreator} />
                  </div>
                </div>
              )}

              {selectedCreator === address && (
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-muted-foreground">
                    You cannot tip yourself
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
