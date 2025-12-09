"use client"

import { useState } from "react"
import { Play, Pause, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface StemControls {
  drums: number
  bass: number
  vocals: number
  other: number
}

interface MasterOutputProps {
  stemVolumes: StemControls
  textureVolume: number
  currentTime: number
  duration: number
  onTimeChange: (time: number) => void
}

export function MasterOutput({ stemVolumes, textureVolume, currentTime, duration, onTimeChange }: MasterOutputProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const calculateCombinedLevel = () => {
    return (stemVolumes.drums + stemVolumes.bass + stemVolumes.vocals + stemVolumes.other + textureVolume) / 5
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const combinedLevel = calculateCombinedLevel()

  return (
    <Card className="border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Master Output</h3>

      {/* Master Waveform Visualizer */}
      <div className="mb-6 h-32 rounded-lg bg-secondary/50 p-4">
        <div className="flex h-full items-center justify-around gap-0.5">
          {Array.from({ length: 120 }).map((_, i) => {
            const baseHeight = Math.sin(i * 0.2) * 40 + 50
            const adjustedHeight = (baseHeight * combinedLevel) / 100

            return (
              <div
                key={i}
                className={cn("w-1 rounded-sm transition-all", isPlaying ? "bg-bio-green" : "bg-bio-green/40")}
                style={{
                  height: `${adjustedHeight}%`,
                  opacity: isPlaying ? Math.random() * 0.5 + 0.5 : 0.6,
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <Slider
          value={[currentTime]}
          onValueChange={([value]) => onTimeChange(value)}
          max={duration}
          step={1}
          className="w-full"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          size="lg"
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "h-14 w-14 rounded-full bg-bio-green text-primary-foreground hover:bg-bio-green/90",
            isPlaying && "bio-glow",
          )}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-bio-green/50 text-bio-green hover:bg-bio-glow hover:text-bio-green bg-transparent"
        >
          <Download className="mr-2 h-5 w-5" />
          Export Mix
        </Button>
      </div>
    </Card>
  )
}
