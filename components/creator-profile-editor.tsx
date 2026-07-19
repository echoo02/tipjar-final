'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useCreatorProfile } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CreatorProfileEditor() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const { profile, updateProfile } = useCreatorProfile(address)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    twitter: profile?.socialLinks?.twitter || '',
    github: profile?.socialLinks?.github || '',
    website: profile?.socialLinks?.website || '',
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      updateProfile({
        name: formData.name,
        bio: formData.bio,
        socialLinks: {
          twitter: formData.twitter,
          github: formData.github,
          website: formData.website,
        },
      })

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          Please connect your wallet to edit your profile.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-2xl font-bold">Edit Your Profile</h2>

      {saved && (
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Profile saved successfully!
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Creator Name</label>
        <input
          type="text"
          maxLength={50}
          placeholder="Your name or project name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {formData.name.length}/50
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          maxLength={200}
          placeholder="Tell supporters about yourself or your work..."
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {formData.bio.length}/200
        </p>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="mb-3 font-medium">Social Links (Optional)</h3>

        <div>
          <label className="block text-sm font-medium">Twitter</label>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@</span>
            <input
              type="text"
              placeholder="username"
              value={formData.twitter}
              onChange={(e) =>
                setFormData({ ...formData, twitter: e.target.value })
              }
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium">GitHub</label>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">github.com/</span>
            <input
              type="text"
              placeholder="username"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium">Website</label>
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Profile'
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
