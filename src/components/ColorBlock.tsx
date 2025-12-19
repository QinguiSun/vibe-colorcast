import { cn } from "@/lib/utils";
import { Play, Quote, Lightbulb, BookOpen, MessageCircle } from "lucide-react";

export type EmotionType = "quote" | "knowledge" | "story" | "casual" | "excitement" | "insight" | "serious";

interface ColorBlockProps {
  type: EmotionType;
  timestamp: string;
  duration: string;
  title: string;
  preview: string;
  isActive?: boolean;
  onClick?: () => void;
}

const emotionConfig: Record<EmotionType, { 
  bg: string; 
  label: string; 
  icon: React.ElementType;
  description: string;
}> = {
  quote: { 
    bg: "bg-emotion-quote", 
    label: "金句", 
    icon: Quote,
    description: "必听"
  },
  knowledge: { 
    bg: "bg-emotion-knowledge", 
    label: "知识点", 
    icon: Lightbulb,
    description: "干货"
  },
  story: { 
    bg: "bg-emotion-story", 
    label: "案例故事", 
    icon: BookOpen,
    description: "趣味"
  },
  casual: { 
    bg: "bg-emotion-casual", 
    label: "闲聊", 
    icon: MessageCircle,
    description: "可跳过"
  },
  excitement: { 
    bg: "bg-emotion-excitement", 
    label: "兴奋", 
    icon: Play,
    description: "精彩"
  },
  insight: { 
    bg: "bg-emotion-insight", 
    label: "干货点", 
    icon: Lightbulb,
    description: "价值"
  },
  serious: { 
    bg: "bg-emotion-serious", 
    label: "严肃讨论", 
    icon: BookOpen,
    description: "深度"
  },
};

export function ColorBlock({ 
  type, 
  timestamp, 
  duration, 
  title, 
  preview, 
  isActive,
  onClick 
}: ColorBlockProps) {
  const config = emotionConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left rounded-lg p-4 transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        config.bg,
        isActive && "ring-2 ring-primary shadow-lg scale-[1.02]"
      )}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
        "group-hover:opacity-20 blur-xl",
        config.bg
      )} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary-foreground/90" />
            <span className="text-xs font-semibold text-primary-foreground/90 uppercase tracking-wide">
              {config.label} · {config.description}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary-foreground/70">
            <span>{timestamp}</span>
            <span>·</span>
            <span>{duration}</span>
          </div>
        </div>
        
        {/* Title */}
        <h4 className="font-semibold text-primary-foreground mb-1 line-clamp-1">
          {title}
        </h4>
        
        {/* Preview */}
        <p className="text-sm text-primary-foreground/80 line-clamp-2">
          {preview}
        </p>
        
        {/* Play indicator */}
        <div className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm",
          "flex items-center justify-center",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}>
          <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
        </div>
      </div>
    </button>
  );
}
