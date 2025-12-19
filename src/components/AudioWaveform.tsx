import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AudioWaveformProps {
  isPlaying: boolean;
  className?: string;
}

export function AudioWaveform({ isPlaying, className }: AudioWaveformProps) {
  const [bars] = useState(() => 
    Array.from({ length: 40 }, () => Math.random() * 0.7 + 0.3)
  );

  return (
    <div className={cn("flex items-center justify-center gap-0.5 h-12", className)}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-1 rounded-full transition-all duration-150",
            "bg-gradient-to-t from-primary/60 to-primary"
          )}
          style={{
            height: isPlaying ? `${height * 100}%` : '20%',
            animationDelay: `${index * 50}ms`,
            animation: isPlaying ? 'wave 1s ease-in-out infinite' : 'none',
          }}
        />
      ))}
    </div>
  );
}
