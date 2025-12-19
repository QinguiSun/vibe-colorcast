import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ColorBlock, EmotionType } from "./ColorBlock";
import { ColorFlow } from "./ColorFlow";
import { ProcessingSteps } from "./ProcessingSteps";
import { EmotionLegend } from "./EmotionLegend";
import { EmotionPoster } from "./EmotionPoster";
import { AudioWaveform } from "./AudioWaveform";
import { Sparkles, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demo
const mockSegments = [
  { id: "1", type: "casual" as const, width: 8, label: "开场寒暄" },
  { id: "2", type: "quote" as const, width: 12, label: "金句时刻" },
  { id: "3", type: "knowledge" as const, width: 18, label: "核心知识点" },
  { id: "4", type: "story" as const, width: 15, label: "案例分享" },
  { id: "5", type: "serious" as const, width: 10, label: "深度讨论" },
  { id: "6", type: "excitement" as const, width: 12, label: "精彩互动" },
  { id: "7", type: "insight" as const, width: 15, label: "干货总结" },
  { id: "8", type: "casual" as const, width: 10, label: "结尾闲聊" },
];

const mockBlocks: Array<{
  id: string;
  type: EmotionType;
  timestamp: string;
  duration: string;
  title: string;
  preview: string;
}> = [
  {
    id: "1",
    type: "quote",
    timestamp: "03:24",
    duration: "2分钟",
    title: "「最好的投资就是投资自己」",
    preview: "主持人分享了关于个人成长的深刻见解，这段话值得反复回味...",
  },
  {
    id: "2",
    type: "knowledge",
    timestamp: "08:15",
    duration: "5分钟",
    title: "产品经理的三个核心能力",
    preview: "嘉宾详细解析了优秀产品经理必备的技能树，包括用户洞察、数据分析...",
  },
  {
    id: "3",
    type: "story",
    timestamp: "15:30",
    duration: "4分钟",
    title: "从0到1打造爆款的故事",
    preview: "一个普通团队如何在3个月内做出百万用户产品的真实案例...",
  },
  {
    id: "4",
    type: "knowledge",
    timestamp: "22:00",
    duration: "6分钟",
    title: "AI时代的职业转型指南",
    preview: "深度分析AI对各行业的影响，以及个人应该如何应对这一变革...",
  },
  {
    id: "5",
    type: "casual",
    timestamp: "35:00",
    duration: "3分钟",
    title: "日常生活闲聊",
    preview: "嘉宾聊到最近喜欢的电视剧和周末活动，轻松愉快的话题...",
  },
];

export function PodcastDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [podcastUrl, setPodcastUrl] = useState("");
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const startProcessing = useCallback(() => {
    if (!podcastUrl.trim()) {
      setPodcastUrl("https://example.com/podcast/episode-42");
    }
    setIsProcessing(true);
    setProcessingStep(0);
    setIsComplete(false);
    setActiveBlockId(null);

    // Simulate processing steps
    const stepDurations = [1500, 2000, 1500];
    let currentStep = 0;

    const processNextStep = () => {
      if (currentStep < stepDurations.length - 1) {
        currentStep++;
        setProcessingStep(currentStep);
        setTimeout(processNextStep, stepDurations[currentStep]);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setIsProcessing(false);
        }, 1000);
      }
    };

    setTimeout(processNextStep, stepDurations[0]);
  }, [podcastUrl]);

  const handleBlockClick = (id: string) => {
    setActiveBlockId(id);
    setIsPlaying(true);
    // Calculate position based on block
    const blockIndex = mockBlocks.findIndex(b => b.id === id);
    setCurrentPosition((blockIndex / mockBlocks.length) * 100);
  };

  const handleSegmentClick = (id: string) => {
    const segmentIndex = mockSegments.findIndex(s => s.id === id);
    let position = 0;
    for (let i = 0; i < segmentIndex; i++) {
      position += mockSegments[i].width;
    }
    setCurrentPosition(position + mockSegments[segmentIndex].width / 2);
    setIsPlaying(true);
  };

  // Auto-advance position when playing
  useEffect(() => {
    if (isPlaying && isComplete) {
      const interval = setInterval(() => {
        setCurrentPosition(prev => (prev + 0.5) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isComplete]);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Input
          placeholder="粘贴播客链接或上传音频文件..."
          value={podcastUrl}
          onChange={(e) => setPodcastUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={startProcessing}
          disabled={isProcessing}
          size="lg"
          className="gap-2 px-8"
        >
          <Sparkles className="w-5 h-5" />
          生成色彩笔记
        </Button>
      </div>

      {/* Processing Steps */}
      {(isProcessing || isComplete) && (
        <div className="animate-slide-in">
          <ProcessingSteps currentStep={processingStep} isComplete={isComplete} />
        </div>
      )}

      {/* Results Section */}
      {isComplete && (
        <div className="space-y-8 animate-slide-in" style={{ animationDelay: "200ms" }}>
          {/* Legend */}
          <EmotionLegend />

          {/* Color Flow Visualization */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">情绪心电图</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <span>点击任意色块跳转播放</span>
              </div>
            </div>
            
            <ColorFlow
              segments={mockSegments}
              currentPosition={currentPosition}
              onSegmentClick={handleSegmentClick}
              isAnimating={!isComplete}
            />

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPosition(Math.max(0, currentPosition - 10))}
              >
                <SkipForward className="w-4 h-4 rotate-180" />
              </Button>
              <Button
                size="icon"
                className="w-12 h-12"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPosition(Math.min(100, currentPosition + 10))}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Waveform */}
            <AudioWaveform isPlaying={isPlaying} className="mt-4" />
          </div>

          {/* Color Blocks Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">内容分段</h3>
            <div className="grid gap-3">
              {mockBlocks.map((block) => (
                <ColorBlock
                  key={block.id}
                  {...block}
                  isActive={activeBlockId === block.id}
                  onClick={() => handleBlockClick(block.id)}
                />
              ))}
            </div>
          </div>

          {/* Poster Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">自动生成传播海报</h3>
            <div className="max-w-sm mx-auto">
              <EmotionPoster
                title="AI时代的个人成长指南"
                host="张三 x 李四"
                duration="45分钟"
                emotionData={{
                  quote: 3,
                  knowledge: 8,
                  story: 4,
                  casual: 2,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
