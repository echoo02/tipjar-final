/**
 * Circle CCTP Utility Functions
 * Handles cross-chain transfer logic and attestation
 */

import { ethers } from 'ethers'
import axios from 'axios'
import { CIRCLE_ATTESTATION_API, MESSAGING_DOMAINS } from './cctp-config'

/**
 * Convert an Ethereum address to bytes32 format for CCTP
 */
export function addressToBytes32(address: string): `0x${string}` {
  return ('0x' + address.slice(2).padStart(64, '0')) as `0x${string}`
}

/**
 * Convert bytes32 back to Ethereum address
 */
export function bytes32ToAddress(bytes32: string): `0x${string}` {
  return ('0x' + bytes32.slice(-40)) as `0x${string}`
}

/**
 * Get attestation from Circle API for a cross-chain message
 */
export async function getAttestationFromCircle(
  messageHash: string
): Promise<string> {
  try {
    let attestation: string | null = null
    let attempts = 0
    const maxAttempts = 10

    // Poll for attestation (usually available within 30 seconds)
    while (!attestation && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000))

      const response = await axios.get(
        `${CIRCLE_ATTESTATION_API}/attestations/${messageHash}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )

      if (response.data?.attestation) {
        attestation = response.data.attestation
      }

      attempts++
    }

    if (!attestation) {
      throw new Error('Attestation not available after polling')
    }

    return attestation
  } catch (error) {
    console.error('[v0] Error fetching attestation from Circle:', error)
    throw new Error('Failed to get attestation from Circle')
  }
}

/**
 * Build the message hash for CCTP transfer
 */
export function buildCCTPMessage(
  version: number,
  sourceDomain: number,
  destinationDomain: number,
  nonce: number,
  sender: `0x${string}`,
  recipient: `0x${string}`,
  destinationCaller: `0x${string}`
): string {
  const messageBody = ethers.AbiCoder.defaultAbiCoder().encode(
    ['uint32', 'address', 'address', 'address'],
    [destinationDomain, sender, recipient, destinationCaller]
  )

  const messageHeader = ethers.AbiCoder.defaultAbiCoder().encode(
    ['uint32', 'uint32', 'uint64'],
    [version, sourceDomain, nonce]
  )

  return ethers.keccak256(messageHeader + messageBody.slice(2))
}

/**
 * Validate if a cross-chain transfer is valid
 */
export function validateCrossChainTransfer(
  sourceChainId: number,
  destinationChainId: number,
  amount: string,
  recipient: string
): { valid: boolean; error?: string } {
  // Check if amount is valid
  if (!amount || parseFloat(amount) <= 0) {
    return { valid: false, error: 'Invalid transfer amount' }
  }

  // Check if source and destination are different
  if (sourceChainId === destinationChainId) {
    return {
      valid: false,
      error: 'Source and destination chains must be different',
    }
  }

  // Check if recipient is valid address
  if (!ethers.isAddress(recipient)) {
    return { valid: false, error: 'Invalid recipient address' }
  }

  return { valid: true }
}

/**
 * Get the messaging domain ID for a chain
 */
export function getMessageDomain(chainId: number): number | null {
  return MESSAGING_DOMAINS[chainId] || null
}

/**
 * Format USDC amount for display
 */
export function formatUSDC(amount: string | bigint, decimals: number = 6): string {
  if (typeof amount === 'bigint') {
    return ethers.formatUnits(amount, decimals)
  }
  return ethers.formatUnits(amount, decimals)
}

/**
 * Parse USDC amount from display value
 */
export function parseUSDC(amount: string, decimals: number = 6): bigint {
  return ethers.parseUnits(amount, decimals)
}
