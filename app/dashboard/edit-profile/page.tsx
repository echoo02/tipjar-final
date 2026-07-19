'use client'

import { WalletConnectButton } from '@/components/wallet-connect-button'
import { CreatorProfileEditor } from '@/components/creator-profile-editor'
import { useAccount } from 'wagmi'

export default function EditProfilePage() {
  const { isConnected } = useAccount()

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

      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Please connect a Web3 wallet to edit your profile
            </p>
          </div>
        ) : (
          <CreatorProfileEditor />
        )}
      </div>
    </main>
  )
}
