import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ColorSegment {
  id: string;
  type: "excitement" | "insight" | "serious" | "quote" | "knowledge" | "story" | "casual";
  width: number;
  label?: string;
}

interface ColorFlowProps {
  segments: ColorSegment[];
  currentPosition?: number;
  onSegmentClick?: (id: string) => void;
  isAnimating?: boolean;
}

const emotionColors: Record<string, string> = {
  excitement: "bg-emotion-excitement",
  insight: "bg-emotion-insight",
  serious: "bg-emotion-serious",
  quote: "bg-emotion-quote",
  knowledge: "bg-emotion-knowledge",
  story: "bg-emotion-story",
  casual: "bg-emotion-casual",
};

export function ColorFlow({ 
  segments, 
  currentPosition = 0, 
  onSegmentClick,
  isAnimating = false 
}: ColorFlowProps) {
  const [visibleSegments, setVisibleSegments] = useState<number>(0);

  useEffect(() => {
    if (isAnimating) {
      setVisibleSegments(0);
      const interval = setInterval(() => {
        setVisibleSegments(prev => {
          if (prev >= segments.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setVisibleSegments(segments.length);
    }
  }, [isAnimating, segments.length]);

  return (
    <div className="relative">
      {/* Flow container */}
      <div className="flex h-16 rounded-xl overflow-hidden shadow-lg">
        {segments.map((segment, index) => (
          <button
            key={segment.id}
            onClick={() => onSegmentClick?.(segment.id)}
            className={cn(
              "relative transition-all duration-500 ease-out",
              emotionColors[segment.type],
              "hover:brightness-110 hover:scale-y-110",
              "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-foreground/50",
              index < visibleSegments ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              width: `${segment.width}%`,
              transitionDelay: isAnimating ? `${index * 100}ms` : '0ms'
            }}
          >
            {/* Shimmer effect */}
            <div className={cn(
              "absolute inset-0 opacity-30",
              "bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent",
              isAnimating && "animate-shimmer bg-[length:200%_100%]"
            )} />
            
            {/* Tooltip */}
            <div className={cn(
              "absolute -top-10 left-1/2 -translate-x-1/2",
              "px-2 py-1 rounded bg-foreground text-background text-xs font-medium",
              "opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
              "pointer-events-none"
            )}>
              {segment.label}
            </div>
          </button>
        ))}
      </div>

      {/* Current position indicator */}
      <div 
        className="absolute top-0 h-full w-1 bg-foreground/80 rounded-full shadow-lg transition-all duration-300"
        style={{ left: `${currentPosition}%` }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground shadow-lg" />
      </div>

      {/* Time markers */}
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>00:00</span>
        <span>播客时间轴</span>
        <span>45:00</span>
      </div>
    </div>
  );
}
