import React from 'react'
import type { Platform } from '../types'

interface PlatformSelectorProps {
  platforms: Platform[]
  selectedPlatform: string
  onPlatformChange: (platform: string) => void
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  selectedPlatform,
  onPlatformChange
}) => {
  return (
    <div className="platform-tabs">
      {platforms.map((platform) => (
        <button
          key={platform.name}
          className={`platform-tab ${selectedPlatform === platform.name ? 'active' : ''}`}
          onClick={() => onPlatformChange(platform.name)}
        >
          {platform.displayName || platform.name}
        </button>
      ))}
    </div>
  )
}
