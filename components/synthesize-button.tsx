"use client"

import { Cpu, Leaf, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SynthesizeButtonProps {
  disabled: boolean
  isProcessing: boolean
  processingStage: string
  onSynthesize: () => void
}

export function SynthesizeButton({ disabled, isProcessing, processingStage, onSynthesize }: SynthesizeButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Button
        size="lg"
        disabled={disabled}
        onClick={onSynthesize}
        className={cn(
          "group relative h-16 px-8 text-lg font-semibold transition-all",
          "bg-bio-green text-primary-foreground hover:bg-bio-green/90",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          !disabled && !isProcessing && "bio-glow-strong",
        )}
      >
        <div className="flex items-center gap-3">
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Cpu className="h-6 w-6 transition-transform group-hover:scale-110" />
              <Leaf className="h-6 w-6 transition-transform group-hover:scale-110" />
            </>
          )}
          <span>{isProcessing ? "PROCESSING" : "SYNTHESIZE"}</span>
        </div>
      </Button>

      {isProcessing && processingStage && (
        <p className="mt-4 text-sm text-bio-green animate-pulse">{processingStage}</p>
      )}
    </div>
  )
}
