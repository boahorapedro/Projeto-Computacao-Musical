"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Music, AudioWaveform as Waveform, Disc3, Mic, Play, Pause } from "lucide-react"
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

interface AudioUploadCardProps {
  title: string
  description: string
  file: File | null
  onFileChange: (file: File | null) => void
  showStemIndicators?: boolean
  isTexture?: boolean
}

export function AudioUploadCard({
  title,
  description,
  file,
  onFileChange,
  showStemIndicators = false,
  isTexture = false,
}: AudioUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [stemVolumes, setStemVolumes] = useState<StemControls>({
    drums: 75,
    bass: 75,
    vocals: 75,
    other: 75,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileChange(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      onFileChange(droppedFile)
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const updateStemVolume = (stem: keyof StemControls, value: number) => {
    setStemVolumes((prev) => ({ ...prev, [stem]: value }))
  }

  return (
    <Card className="overflow-hidden border-border bg-card">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Music className="h-5 w-5 text-muted-foreground" />
        </div>

        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed transition-all",
            isDragOver
              ? "border-bio-green bg-bio-glow"
              : file
                ? "border-bio-green/50 bg-secondary/50"
                : "border-border bg-secondary/30",
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium text-foreground">Drop audio file here</p>
              <p className="mb-4 text-xs text-muted-foreground">or</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                className="border-bio-green/50 text-bio-green hover:bg-bio-glow hover:text-bio-green"
              >
                Browse Files
              </Button>
            </div>
          ) : (
            <div className="p-6">
              {/* Waveform Visualization */}
              <div className="mb-4 h-20 rounded bg-secondary/50 p-2">
                <div className="flex h-full items-end justify-around gap-0.5">
                  {Array.from({ length: isTexture ? 60 : 80 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1 rounded-sm transition-all",
                        isTexture ? "bg-bio-green/40" : "bg-bio-green/60",
                        isPlaying && "animate-pulse",
                      )}
                      style={{
                        height: `${isTexture ? Math.random() * 40 + 30 : Math.sin(i * 0.3) * 30 + 50}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={togglePlayback}
                  className="h-10 w-10 rounded-full bg-bio-green/20 p-0 hover:bg-bio-green/30"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 text-bio-green" />
                  ) : (
                    <Play className="h-4 w-4 text-bio-green" />
                  )}
                </Button>
                <div className="flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="text-xs text-bio-green hover:text-bio-green"
                >
                  Change
                </Button>
              </div>

              {showStemIndicators && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground">Stem Control</p>

                  {/* Drums */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Disc3 className="h-3 w-3 text-bio-green" />
                        <span className="text-xs text-bio-green">Drums</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stemVolumes.drums}%</span>
                    </div>
                    <Slider
                      value={[stemVolumes.drums]}
                      onValueChange={([value]) => updateStemVolume("drums", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Bass */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Waveform className="h-3 w-3 text-bio-green" />
                        <span className="text-xs text-bio-green">Bass</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stemVolumes.bass}%</span>
                    </div>
                    <Slider
                      value={[stemVolumes.bass]}
                      onValueChange={([value]) => updateStemVolume("bass", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Vocals */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Mic className="h-3 w-3 text-bio-green" />
                        <span className="text-xs text-bio-green">Vocals</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stemVolumes.vocals}%</span>
                    </div>
                    <Slider
                      value={[stemVolumes.vocals]}
                      onValueChange={([value]) => updateStemVolume("vocals", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Other */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Music className="h-3 w-3 text-bio-green" />
                        <span className="text-xs text-bio-green">Other</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stemVolumes.other}%</span>
                    </div>
                    <Slider
                      value={[stemVolumes.other]}
                      onValueChange={([value]) => updateStemVolume("other", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {isTexture && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground">Volume Control</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Waveform className="h-3 w-3 text-bio-green" />
                        <span className="text-xs text-bio-green">Texture Level</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{stemVolumes.other}%</span>
                    </div>
                    <Slider
                      value={[stemVolumes.other]}
                      onValueChange={([value]) => updateStemVolume("other", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
    </Card>
  )
}
