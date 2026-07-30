'use client'

import { Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface TransactionReceiptProps {
  hash: string
  amount: string
  senderAddress: string
  receiverAddress: string
  explorerUrl: string
  chainName: string
  isLoading?: boolean
}

export function TransactionReceipt({
  hash,
  amount,
  senderAddress,
  receiverAddress,
  explorerUrl,
  chainName,
  isLoading = false,
}: TransactionReceiptProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 p-6 dark:border-green-900 dark:from-green-950/40 dark:to-green-950/20">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-lg font-semibold text-green-900 dark:text-green-100">
            {isLoading ? 'Transaction Processing...' : 'Transaction Successful'}
          </h4>
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          {isLoading
            ? 'Your transaction is being confirmed on the blockchain'
            : 'Your tip has been sent successfully'}
        </p>
      </div>

      {/* Receipt Details */}
      <div className="space-y-4">
        {/* Amount Section */}
        <div className="rounded-lg bg-white/50 p-4 dark:bg-black/20">
          <p className="text-xs font-medium text-muted-foreground">Amount Sent</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {amount} USDC
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid gap-3">
          {/* Sender */}
          <div className="rounded-lg bg-white/50 p-3 dark:bg-black/20">
            <p className="text-xs font-medium text-muted-foreground">From (Sender)</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-sm text-foreground">
                {formatAddress(senderAddress)}
              </p>
              <button
                onClick={() => copyToClipboard(senderAddress, 'sender')}
                className="rounded p-1.5 hover:bg-white/50 dark:hover:bg-black/30"
                title="Copy address"
              >
                {copiedField === 'sender' ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Receiver */}
          <div className="rounded-lg bg-white/50 p-3 dark:bg-black/20">
            <p className="text-xs font-medium text-muted-foreground">To (Receiver)</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-sm text-foreground">
                {formatAddress(receiverAddress)}
              </p>
              <button
                onClick={() => copyToClipboard(receiverAddress, 'receiver')}
                className="rounded p-1.5 hover:bg-white/50 dark:hover:bg-black/30"
                title="Copy address"
              >
                {copiedField === 'receiver' ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Transaction Hash */}
          <div className="rounded-lg bg-white/50 p-3 dark:bg-black/20">
            <p className="text-xs font-medium text-muted-foreground">Transaction Hash</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-sm text-foreground">
                {formatAddress(hash)}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => copyToClipboard(hash, 'hash')}
                  className="rounded p-1.5 hover:bg-white/50 dark:hover:bg-black/30"
                  title="Copy hash"
                >
                  {copiedField === 'hash' ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <a
                  href={`${explorerUrl}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1.5 hover:bg-white/50 dark:hover:bg-black/30"
                  title="View on explorer"
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Chain Info */}
          <div className="rounded-lg bg-white/50 p-3 dark:bg-black/20">
            <p className="text-xs font-medium text-muted-foreground">Network</p>
            <p className="mt-1 text-sm font-medium text-foreground">{chainName}</p>
          </div>
        </div>

        {/* Status Info */}
        {isLoading && (
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Waiting for blockchain confirmation...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
