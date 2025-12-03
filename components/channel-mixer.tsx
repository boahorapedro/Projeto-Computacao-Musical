"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChannelStrip } from "@/components/channel-strip"

export function ChannelMixer() {
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
    },
  ])

  const updateChannel = (id: number, updates: Partial<(typeof channels)[0]>) => {
    setChannels((prev) => prev.map((ch) => (ch.id === id ? { ...ch, ...updates } : ch)))
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {channels.map((channel) => (
          <ChannelStrip key={channel.id} {...channel} onUpdate={(updates) => updateChannel(channel.id, updates)} />
        ))}
      </div>
    </Card>
  )
}
