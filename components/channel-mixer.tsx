"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChannelStrip } from "@/components/channel-strip"

interface StemControls {
  drums: number
  bass: number
  vocals: number
  other: number
}

interface ChannelMixerProps {
  stemVolumes: StemControls
  textureVolume: number
  onStemVolumesChange: (volumes: StemControls) => void
  onTextureVolumeChange: (volume: number) => void
}

export function ChannelMixer({
  stemVolumes,
  textureVolume,
  onStemVolumesChange,
  onTextureVolumeChange,
}: ChannelMixerProps) {
  const [channels, setChannels] = useState([
    {
      id: 1,
      label: "Bio-Drums",
      subtitle: "Reconstructed Rhythm",
      volume: 75,
      muted: false,
      solo: false,
      granularity: 50,
      color: "green" as const,
      stemKey: "drums" as keyof StemControls,
    },
    {
      id: 2,
      label: "Bio-Bass",
      subtitle: "Reconstructed Low-End",
      volume: 70,
      muted: false,
      solo: false,
      granularity: 40,
      color: "green" as const,
      stemKey: "bass" as keyof StemControls,
    },
    {
      id: 3,
      label: "Atmosphere",
      subtitle: "Reconstructed Melody",
      volume: 65,
      muted: false,
      solo: false,
      granularity: 60,
      color: "green" as const,
      stemKey: "other" as keyof StemControls,
    },
    {
      id: 4,
      label: "Original Vocals",
      subtitle: "Clean Voice",
      volume: 80,
      muted: false,
      solo: false,
      granularity: 0,
      color: "blue" as const,
      stemKey: "vocals" as keyof StemControls,
    },
  ])

  const updateChannel = (id: number, updates: Partial<(typeof channels)[0]>) => {
    setChannels((prev) => {
      const newChannels = prev.map((ch) => (ch.id === id ? { ...ch, ...updates } : ch))

      // Sync volume changes back to parent
      if (updates.volume !== undefined) {
        const channel = newChannels.find((ch) => ch.id === id)
        if (channel) {
          if (channel.label === "Atmosphere") {
            // This is the texture channel
            onTextureVolumeChange(updates.volume)
          } else if (channel.stemKey) {
            // Update the corresponding stem
            onStemVolumesChange({
              ...stemVolumes,
              [channel.stemKey]: updates.volume,
            })
          }
        }
      }

      return newChannels
    })
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {channels.map((channel) => {
          const syncedVolume = channel.label === "Atmosphere" ? textureVolume : stemVolumes[channel.stemKey]

          return (
            <ChannelStrip
              key={channel.id}
              {...channel}
              volume={syncedVolume}
              onUpdate={(updates) => updateChannel(channel.id, updates)}
            />
          )
        })}
      </div>
    </Card>
  )
}
