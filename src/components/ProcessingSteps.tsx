import { cn } from "@/lib/utils";
import { Mic, FileText, Palette, Check, Loader2 } from "lucide-react";

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  { id: "audio", label: "音频解析", description: "提取音频内容", icon: Mic },
  { id: "text", label: "语音转文本", description: "AI识别内容", icon: FileText },
  { id: "color", label: "色彩映射", description: "情绪分析着色", icon: Palette },
];

interface ProcessingStepsProps {
  currentStep: number;
  isComplete: boolean;
}

export function ProcessingSteps({ currentStep, isComplete }: ProcessingStepsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep || isComplete;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                  isCompleted && "bg-emotion-story text-primary-foreground",
                  isActive && "bg-primary text-primary-foreground animate-pulse-glow",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <span className={cn(
                "mt-2 text-sm font-medium transition-colors",
                isActive && "text-primary",
                isCompleted && "text-emotion-story",
                !isActive && !isCompleted && "text-muted-foreground"
              )}>
                {step.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {step.description}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="w-16 h-1 mx-4 rounded-full overflow-hidden bg-muted">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    isCompleted ? "w-full bg-emotion-story" : "w-0 bg-primary"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
