import { Bot, User } from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  suggestions?: string[];
}

interface MessageItemProps {
  message: ChatMessage;
  onSelectSuggestion?: (query: string) => void;
}

export function MessageItem({ message, onSelectSuggestion }: MessageItemProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"} group`}>
      {/* AI 아바타 */}
      {isAssistant && (
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5" />
        </div>
      )}

      <div className={`max-w-[85%] space-y-2.5 ${isAssistant ? "items-start" : "items-end ml-auto"}`}>
        {/* 말풍선 본문 */}
        <div
          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
            isAssistant
              ? "bg-[#191A23] text-foreground border border-border/80 rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm ml-auto"
          }`}
        >
          {message.content}
        </div>

        {/* 추천 질문 칩 (AI 메시지에만 부착 가능) */}
        {isAssistant && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestion?.(suggestion)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/90 border border-border/70 hover:border-primary/60 hover:text-primary hover:bg-secondary transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 사용자 아바타 */}
      {!isAssistant && (
        <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-muted shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}

