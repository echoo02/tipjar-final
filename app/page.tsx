'use client'

import { WalletConnectButton } from '@/components/wallet-connect-button'
import Link from 'next/link'
import { ArrowRight, Zap, Users, Gift } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Tip Jar</h1>
          </div>
          <WalletConnectButton />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 pt-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-pretty">
                Support Creators with{' '}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Instant USDC Tips
                </span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Tip Jar is a decentralized tipping platform built on Arc Testnet.
                Connect your Web3 wallet and send USDC payments to creators,
                developers, and open-source contributors instantly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://faucet.circle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-medium hover:bg-muted transition-colors"
              >
                Get Testnet ETH
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Instant Payments</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send USDC tips instantly on Arc Testnet
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Creator Profiles</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Set up your profile and start receiving tips
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors sm:col-span-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                <Gift className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Multiple Wallets</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect MetaMask, Rabby, OKX Wallet and more
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 border-t border-border/50 pt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Tip Jar?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Decentralized</h3>
              <p className="text-muted-foreground">
                No intermediaries, no fees. Direct wallet-to-wallet transactions.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Creator Friendly</h3>
              <p className="text-muted-foreground">
                Easy setup, own your profile, receive tips instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20">
                  <Gift className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Stablecoin Payments</h3>
              <p className="text-muted-foreground">
                Use USDC for predictable, stable value transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
