'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { USDC_ARC, ARC_EXPLORER_URL, ARC_FAUCET_URL } from '@/lib/arc-config'
import { USDC_ABI } from '@/lib/usdc-abi'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { TransactionReceipt } from './transaction-receipt'

interface TipFormProps {
  creatorAddress: string
}

export function TipForm({ creatorAddress }: TipFormProps) {
  const { address, isConnected } = useAccount()
  const [tipAmount, setTipAmount] = useState('')
  const [submittedAmount, setSubmittedAmount] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const tipAmountBigInt = tipAmount
    ? parseUnits(tipAmount, USDC_ARC.decimals)
    : 0n

  const { writeContract, isPending: isWritePending, data: hash } = useWriteContract()
  const { isLoading: isTxLoading } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    if (!tipAmount || parseFloat(tipAmount) <= 0) {
      setError('Please enter a valid tip amount')
      return
    }

    if (creatorAddress.toLowerCase() === address?.toLowerCase()) {
      setError('You cannot tip yourself')
      return
    }

    setSubmittedAmount(tipAmount)
    writeContract({
      address: USDC_ARC.address,
      abi: USDC_ABI,
      functionName: 'transfer',
      args: [creatorAddress as `0x${string}`, tipAmountBigInt],
    })
  }

  if (hash) {
    setTimeout(() => {
      setTipAmount('')
      setMessage('')
    }, 2000)
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          Please{' '}
          <span className="font-medium text-foreground">
            connect your wallet
          </span>{' '}
          to send tips.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Send a Tip</h3>

      {hash && (
        <TransactionReceipt
          hash={hash}
          amount={submittedAmount}
          senderAddress={address || ''}
          receiverAddress={creatorAddress}
          explorerUrl={ARC_EXPLORER_URL}
          chainName="Arc Testnet"
          isLoading={isTxLoading}
        />
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">
          Tip Amount (USDC)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isWritePending || isTxLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message (Optional)</label>
        <textarea
          placeholder="Add a personal message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          disabled={isWritePending || isTxLoading}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Messages are stored locally (not on-chain in MVP)
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isWritePending || isTxLoading || !tipAmount}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWritePending || isTxLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isTxLoading ? 'Confirming...' : 'Sending...'}
            </>
          ) : (
            'Send Tip'
          )}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        You need Arc Testnet ETH for gas fees.{' '}
        <a
          href={ARC_FAUCET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Get testnet ETH
        </a>
      </p>
    </form>
  )
}
