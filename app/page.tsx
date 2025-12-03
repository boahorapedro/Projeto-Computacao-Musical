"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"
import { AudioUploadCard } from "@/components/audio-upload-card"
import { ChannelMixer } from "@/components/channel-mixer"
import { MasterOutput } from "@/components/master-output"
import { SynthesizeButton } from "@/components/synthesize-button"

export default function EcoSynthPage() {
  const [baseAudio, setBaseAudio] = useState<File | null>(null)
  const [textureAudio, setTextureAudio] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState("")
  const [isProcessed, setIsProcessed] = useState(false)

  const handleSynthesize = async () => {
    if (!baseAudio || !textureAudio) return

    setIsProcessing(true)

    // Simulate processing stages
    setProcessingStage("Separating Stems...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setProcessingStage("Granulating Texture...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setProcessingStage("Reconstructing Layers...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setProcessingStage("")
    setIsProcessed(true)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Leaf className="h-8 w-8 text-bio-green" />
              <div className="absolute inset-0 bio-glow-strong" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">EcoSynth</h1>
              <p className="text-sm text-muted-foreground">Bioluminescent Audio Synthesis Lab</p>
            </div>
          </div>
        </div>

        {/* Top Section: Sources */}
        <div className="grid gap-6 md:grid-cols-2">
          <AudioUploadCard
            title="Base Composition"
            description="Upload your musical foundation"
            file={baseAudio}
            onFileChange={setBaseAudio}
            showStemIndicators={true}
          />
          <AudioUploadCard
            title="Texture Source"
            description="Add environmental ambience"
            file={textureAudio}
            onFileChange={setTextureAudio}
            showStemIndicators={false}
            isTexture={true}
          />
        </div>

        {/* Center Section: Transformation */}
        <SynthesizeButton
          disabled={!baseAudio || !textureAudio || isProcessing}
          isProcessing={isProcessing}
          processingStage={processingStage}
          onSynthesize={handleSynthesize}
        />

        {/* Bottom Section: Reconstruction Mixer */}
        {isProcessed && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-t border-border pt-6">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">Reconstruction Mixer</h2>
              <ChannelMixer />
            </div>

            <MasterOutput />
          </div>
        )}
      </div>
    </div>
  )
}
