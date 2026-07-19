import { useEffect, useState } from 'react'
import { useAccount, useBalance, useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { USDC_ARC } from './arc-config'
import { USDC_ABI } from './usdc-abi'
import { getCreatorProfile, saveCreatorProfile, CreatorProfile } from './storage'

export function useUSDCBalance(address?: string) {
  const { address: connectedAddress } = useAccount()
  const targetAddress = address || connectedAddress

  const { data, isLoading, isError } = useReadContract({
    address: USDC_ARC.address as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
    account: targetAddress as `0x${string}`,
  }) as any

  return {
    balance: data ? formatUnits(data, USDC_ARC.decimals) : '0',
    balanceBigInt: data || 0n,
    isLoading,
    isError,
  }
}

export function useCreatorProfile(address: string | undefined) {
  const [profile, setProfile] = useState<CreatorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!address) {
      setIsLoading(false)
      return
    }

    const savedProfile = getCreatorProfile(address)
    setProfile(savedProfile)
    setIsLoading(false)
  }, [address])

  const updateProfile = (updates: Partial<CreatorProfile>) => {
    if (!address) return

    const newProfile: CreatorProfile = {
      address: address.toLowerCase(),
      name: profile?.name || '',
      bio: profile?.bio || '',
      image: profile?.image,
      socialLinks: profile?.socialLinks,
      createdAt: profile?.createdAt || Date.now(),
      updatedAt: Date.now(),
      ...updates,
    }

    saveCreatorProfile(newProfile)
    setProfile(newProfile)
  }

  return { profile, isLoading, updateProfile }
}

export function useUSDCApproval(
  spender: `0x${string}`,
  amount: string
) {
  const { address } = useAccount()
  const [allowance, setAllowance] = useState<bigint>(0n)

  const { data: allowanceData } = useReadContract({
    address: USDC_ARC.address as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: address && spender ? [address as `0x${string}`, spender] : undefined,
    account: address as `0x${string}`,
  }) as any

  useEffect(() => {
    if (allowanceData) {
      setAllowance(allowanceData)
    }
  }, [allowanceData])

  const needsApproval =
    allowance < parseUnits(amount || '0', USDC_ARC.decimals)

  return { allowance, needsApproval }
}
