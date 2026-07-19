export interface CreatorProfile {
  address: string
  name: string
  bio: string
  image?: string
  socialLinks?: {
    twitter?: string
    github?: string
    website?: string
  }
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = 'tipjar_profiles'

export function getCreatorProfile(address: string): CreatorProfile | null {
  if (typeof window === 'undefined') return null

  try {
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return profiles[address.toLowerCase()] || null
  } catch {
    return null
  }
}

export function saveCreatorProfile(profile: CreatorProfile): void {
  if (typeof window === 'undefined') return

  try {
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    profiles[profile.address.toLowerCase()] = {
      ...profile,
      updatedAt: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  } catch {
    console.error('Failed to save profile')
  }
}

export function getAllProfiles(): Record<string, CreatorProfile> {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function deleteCreatorProfile(address: string): void {
  if (typeof window === 'undefined') return

  try {
    const profiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    delete profiles[address.toLowerCase()]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  } catch {
    console.error('Failed to delete profile')
  }
}
