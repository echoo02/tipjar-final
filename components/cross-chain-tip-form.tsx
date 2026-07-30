'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  CCTP_CHAINS,
  getDestinationChains,
  type CCTPChain,
} from '@/lib/cctp-config'
import { TOKEN_MESSENGER_ABI } from '@/lib/cctp-abi'
import {
  validateCrossChainTransfer,
  addressToBytes32,
  getMessageDomain,
} from '@/lib/cctp-utils'
import { TransactionReceipt } from './transaction-receipt'

interface CrossChainTipFormProps {
  creatorAddress: string
  sourceChainId?: number
}

export function CrossChainTipForm({
  creatorAddress,
  sourceChainId: initialSourceChain,
}: CrossChainTipFormProps) {
  const { address, isConnected, chainId: userChainId } = useAccount()
  const [tipAmount, setTipAmount] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [selectedSourceChain, setSelectedSourceChain] = useState<number>(
    initialSourceChain || userChainId || 5042002
  )
  const [selectedDestinationChain, setSelectedDestinationChain] = useState<number>(
    getDestinationChains(selectedSourceChain)[0]?.id || 11155111
  )
  const [isBridging, setIsBridging] = useState(false)

  const sourceChain = CCTP_CHAINS[
    Object.keys(CCTP_CHAINS).find(
      key => CCTP_CHAINS[key as keyof typeof CCTP_CHAINS].id === selectedSourceChain
    ) as keyof typeof CCTP_CHAINS
  ]

  const destinationChain = CCTP_CHAINS[
    Object.keys(CCTP_CHAINS).find(
      key =>
        CCTP_CHAINS[key as keyof typeof CCTP_CHAINS].id === selectedDestinationChain
    ) as keyof typeof CCTP_CHAINS
  ]

  const availableDestinationChains = getDestinationChains(selectedSourceChain).map(
    chain =>
      CCTP_CHAINS[
        Object.keys(CCTP_CHAINS).find(
          key => CCTP_CHAINS[key as keyof typeof CCTP_CHAINS].id === chain.id
        ) as keyof typeof CCTP_CHAINS
      ]
  )

  const tipAmountBigInt = tipAmount
    ? parseUnits(tipAmount, 6) // USDC has 6 decimals
    : 0n

  const { writeContract, isPending: isWritePending, data: hash } = useWriteContract()
  const { isLoading: isTxLoading } = useWaitForTransactionReceipt({ hash })

  const handleSourceChainChange = (chainId: number) => {
    setSelectedSourceChain(chainId)
    const newDestinationOptions = getDestinationChains(chainId)
    if (newDestinationOptions.length > 0) {
      setSelectedDestinationChain(newDestinationOptions[0].id)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!isConnected) {
      setError('Please connect your wallet first')
      return
    }

    if (userChainId !== selectedSourceChain) {
      setError(
        `Please switch to ${sourceChain?.name} to send from this chain`
      )
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

    if (!sourceChain || !destinationChain) {
      setError('Invalid chain selection')
      return
    }

    // Validate cross-chain transfer
    const validation = validateCrossChainTransfer(
      selectedSourceChain,
      selectedDestinationChain,
      tipAmount,
      creatorAddress
    )

    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setIsBridging(true)

    // Get message domain for destination
    const destinationDomain = getMessageDomain(selectedDestinationChain)
    if (!destinationDomain === null) {
      setError('Destination chain messaging domain not found')
      setIsBridging(false)
      return
    }

    // Execute cross-chain transfer
    try {
      const recipientBytes32 = addressToBytes32(creatorAddress)

      writeContract({
        address: sourceChain.tokenMessenger,
        abi: TOKEN_MESSENGER_ABI,
        functionName: 'depositForBurn',
        args: [
          tipAmountBigInt,
          destinationDomain as number,
          recipientBytes32,
          sourceChain.usdcAddress,
        ],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate transfer')
      setIsBridging(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Connect your wallet to send cross-chain tips
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Send Cross-Chain Tip</h3>

      {hash && (
        <div className="space-y-4">
          <TransactionReceipt
            hash={hash}
            amount={tipAmount}
            senderAddress={address || ''}
            receiverAddress={creatorAddress}
            explorerUrl={sourceChain?.explorer || ''}
            chainName={`${sourceChain?.name} → ${destinationChain?.name}`}
            isLoading={isTxLoading}
          />
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Cross-Chain Transfer in Progress:</strong>
            </p>
            <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
              The attestation will complete within ~30 seconds. Your USDC will be minted on{' '}
              <strong>{destinationChain?.name}</strong> and delivered to the recipient.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">From Chain</label>
          <select
            value={selectedSourceChain}
            onChange={e => handleSourceChainChange(Number(e.target.value))}
            disabled={isWritePending || isTxLoading || isBridging}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {Object.values(CCTP_CHAINS).map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">To Chain</label>
          <select
            value={selectedDestinationChain}
            onChange={e => setSelectedDestinationChain(Number(e.target.value))}
            disabled={isWritePending || isTxLoading || isBridging}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {availableDestinationChains.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Tip Amount (USDC)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={tipAmount}
          onChange={e => setTipAmount(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isWritePending || isTxLoading || isBridging}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message (Optional)</label>
        <textarea
          placeholder="Add a personal message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          disabled={isWritePending || isTxLoading || isBridging}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Cross-chain messages are stored locally
        </p>
      </div>

      <div className="rounded-lg bg-muted p-3">
        <p className="text-xs text-muted-foreground">
          <strong>How it works:</strong> Your USDC is burned on {sourceChain?.name}{' '}
          and minted on {destinationChain?.name}. This process takes ~30 seconds
          for Circle attestation.
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isWritePending || isTxLoading || isBridging || !tipAmount}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWritePending || isTxLoading || isBridging ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isBridging ? 'Bridging...' : isTxLoading ? 'Confirming...' : 'Sending...'}
            </>
          ) : (
            <>
              Send Tip
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Make sure you have USDC on {sourceChain?.name}. Need testnet USDC?{' '}
        <a
          href="https://faucet.circle.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Get from Circle Faucet
        </a>
      </p>
    </form>
  )
}
