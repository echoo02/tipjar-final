'use client'

import { useCreatorProfile } from '@/lib/hooks'
import { Loader2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface CreatorProfileProps {
  address: string
  showEditButton?: boolean
}

export function CreatorProfile({
  address,
  showEditButton = false,
}: CreatorProfileProps) {
  const { profile, isLoading } = useCreatorProfile(address)
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayName = profile?.name || 'Anonymous Creator'
  const displayBio = profile?.bio || 'No bio set'

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <p className="mt-2 text-muted-foreground">{displayBio}</p>

          <div className="mt-4 flex items-center gap-2">
            <p className="font-mono text-sm text-muted-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <button
              onClick={copyAddress}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs hover:bg-muted/80"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          {profile?.socialLinks && (
            <div className="mt-4 flex gap-3">
              {profile.socialLinks.twitter && (
                <a
                  href={`https://twitter.com/${profile.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Twitter
                </a>
              )}
              {profile.socialLinks.github && (
                <a
                  href={`https://github.com/${profile.socialLinks.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
              )}
              {profile.socialLinks.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>

        {showEditButton && (
          <Link
            href="/dashboard/edit-profile"
            className="ml-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  )
}
