"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ChannelStripProps {
  id: number
  label: string
  subtitle: string
  volume: number
  muted: boolean
  solo: boolean
  granularity: number
  color: "green" | "blue"
  onUpdate: (updates: Partial<ChannelStripProps>) => void
}

export function ChannelStrip({
  label,
  subtitle,
  volume,
  muted,
  solo,
  granularity,
  color,
  onUpdate,
}: ChannelStripProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Label */}
      <div className="w-full text-center">
        <h4 className="text-sm font-semibold text-foreground">{label}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {/* Volume Fader */}
      <div className="relative flex h-48 w-full flex-col items-center">
        <div className="relative flex h-full w-12 items-center justify-center rounded-lg bg-secondary/50 p-2">
          <Slider
            value={[volume]}
            onValueChange={([v]) => onUpdate({ volume: v })}
            max={100}
            step={1}
            orientation="vertical"
            className="h-full"
            disabled={muted}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 rounded-b-lg transition-all",
              color === "blue" ? "bg-bio-blue/20" : "bg-bio-green/20",
            )}
            style={{ height: `${volume}%` }}
          />
        </div>
        <span className="mt-2 text-xs font-mono text-muted-foreground">{volume}</span>
      </div>

      {/* Mute and Solo Buttons */}
      <div className="flex w-full gap-2">
        <Button
          size="sm"
          variant={muted ? "default" : "outline"}
          className={cn(
            "flex-1 text-xs font-bold",
            muted && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          )}
          onClick={() => onUpdate({ muted: !muted })}
        >
          M
        </Button>
        <Button
          size="sm"
          variant={solo ? "default" : "outline"}
          className={cn(
            "flex-1 text-xs font-bold",
            solo && color === "blue"
              ? "bg-bio-blue text-primary-foreground hover:bg-bio-blue/90"
              : solo && "bg-bio-green text-primary-foreground hover:bg-bio-green/90",
          )}
          onClick={() => onUpdate({ solo: !solo })}
        >
          S
        </Button>
      </div>

      {/* Granularity Knob (not for vocals) */}
      {granularity !== 0 && (
        <div className="w-full space-y-2">
          <label className="text-xs text-muted-foreground">Granularity</label>
          <div className="flex items-center gap-2">
            <Slider
              value={[granularity]}
              onValueChange={([v]) => onUpdate({ granularity: v })}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="w-8 text-xs font-mono text-muted-foreground">{granularity}</span>
          </div>
        </div>
      )}
    </div>
  )
}
