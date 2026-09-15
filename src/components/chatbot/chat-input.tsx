"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 텍스트 길이에 따른 textarea 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [text]);

  return (
    <div className="p-3 bg-[#191A23] border-t border-border/80 flex items-end gap-2">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요... (예: 단가 문의)"
        disabled={isLoading}
        className="flex-1 min-h-[42px] max-h-[100px] p-2.5 text-xs sm:text-sm rounded-xl bg-[#0F1015] border border-border/60 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim() || isLoading}
        className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-md shadow-primary/20"
        aria-label="메시지 전송"
      >
        <SendHorizonal className="w-4 h-4" />
      </button>
    </div>
  );
}

