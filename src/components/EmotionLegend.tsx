import { cn } from "@/lib/utils";
import { Quote, Lightbulb, BookOpen, MessageCircle } from "lucide-react";

const legendItems = [
  { 
    color: "bg-emotion-quote", 
    label: "金句", 
    description: "必听", 
    icon: Quote 
  },
  { 
    color: "bg-emotion-knowledge", 
    label: "知识点", 
    description: "干货", 
    icon: Lightbulb 
  },
  { 
    color: "bg-emotion-story", 
    label: "案例故事", 
    description: "趣味", 
    icon: BookOpen 
  },
  { 
    color: "bg-emotion-casual", 
    label: "闲聊", 
    description: "可跳过", 
    icon: MessageCircle 
  },
];

export function EmotionLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {legendItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-card border border-border shadow-sm",
              "transition-all hover:shadow-md hover:scale-105"
            )}
          >
            <div className={cn("w-4 h-4 rounded-full", item.color)} />
            <Icon className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{item.label}</span>
            <span className="text-xs text-muted-foreground">({item.description})</span>
          </div>
        );
      })}
    </div>
  );
}
