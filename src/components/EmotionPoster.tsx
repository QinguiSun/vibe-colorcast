import { cn } from "@/lib/utils";
import { Download, Share2 } from "lucide-react";
import { Button } from "./ui/button";

interface EmotionPosterProps {
  title: string;
  host: string;
  duration: string;
  emotionData: {
    quote: number;
    knowledge: number;
    story: number;
    casual: number;
  };
}

export function EmotionPoster({ title, host, duration, emotionData }: EmotionPosterProps) {
  const total = emotionData.quote + emotionData.knowledge + emotionData.story + emotionData.casual;
  
  return (
    <div className="relative">
      {/* Poster Card */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "bg-gradient-to-br from-card via-card to-muted/30",
        "border border-border shadow-xl"
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--emotion-quote)),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--emotion-knowledge)),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,hsl(var(--emotion-story)),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              播客色彩笔记
            </p>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{host} · {duration}</p>
          </div>

          {/* Color Flow Preview */}
          <div className="flex h-8 rounded-lg overflow-hidden mb-6 shadow-sm">
            <div 
              className="bg-emotion-quote transition-all"
              style={{ width: `${(emotionData.quote / total) * 100}%` }}
            />
            <div 
              className="bg-emotion-knowledge transition-all"
              style={{ width: `${(emotionData.knowledge / total) * 100}%` }}
            />
            <div 
              className="bg-emotion-story transition-all"
              style={{ width: `${(emotionData.story / total) * 100}%` }}
            />
            <div 
              className="bg-emotion-casual transition-all"
              style={{ width: `${(emotionData.casual / total) * 100}%` }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "金句", value: emotionData.quote, color: "text-emotion-quote" },
              { label: "知识点", value: emotionData.knowledge, color: "text-emotion-knowledge" },
              { label: "故事", value: emotionData.story, color: "text-emotion-story" },
              { label: "闲聊", value: emotionData.casual, color: "text-emotion-casual" },
            ].map((stat) => (
              <div 
                key={stat.label}
                className="flex items-center justify-between p-2 rounded-lg bg-background/50"
              >
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className={cn("font-bold", stat.color)}>{stat.value}处</span>
              </div>
            ))}
          </div>

          {/* Branding */}
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              由 <span className="font-semibold text-primary">PodColor</span> 生成
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mt-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          下载海报
        </Button>
        <Button size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          分享
        </Button>
      </div>
    </div>
  );
}
