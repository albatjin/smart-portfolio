import { Bot, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-border/80 bg-[#191A23] select-none">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
          <Bot className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-foreground font-heading">
            포트폴리오 AI 어시스턴트
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="실시간 대기 중" />
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="채팅창 닫기"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

