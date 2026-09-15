"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquareQuote } from "lucide-react";
import { ChatHeader } from "./chat-header";
import { MessageItem, ChatMessage } from "./message-item";
import { TypingIndicator } from "./typing-indicator";
import { ChatInput } from "./chat-input";

const INITIAL_WELCOME: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "안녕하세요! 김진호 디렉터의 포트폴리오 AI 어시스턴트입니다.\n공간 인테리어, 브랜드 아이덴티티 프로젝트나 대략적인 견적·일정이 궁금하시다면 편하게 질문해 주세요! 😊",
  suggestions: [
    "어떤 프로젝트들을 진행했나요?",
    "기본 프로젝트 단가와 일정이 궁금해요.",
    "F&B 브랜드 관련 작업 사례가 있나요?",
  ],
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 함수
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 전역 이벤트 리스너 (Navbar나 Hero의 'AI 상담하기' 클릭 시 위젯 열기)
  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean; initialQuery?: string }>;
      setIsOpen(customEvent.detail?.open ?? true);
      if (customEvent.detail?.initialQuery) {
        handleSendMessage(customEvent.detail.initialQuery);
      }
    };

    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  // 메시지 전송 및 AI 응답 처리 (API 호출 및 안전 가드레일)
  const handleSendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        suggestions: data.suggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // API 키 부재 또는 네트워크 오류 시의 안전 폴백 (PRD 가드레일 로직 포함)
      let fallbackReply = "죄송합니다. 현재 일시적인 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

      // 포트폴리오 무관 질문 가드레일 (클라이언트 사이드 방어)
      const outOfScopePatterns = ["날씨", "주식", "정치", "양자역학", "수학", "번역해", "코드 짜줘"];
      const isOutOfScope = outOfScopePatterns.some((pattern) => userText.includes(pattern));

      if (isOutOfScope) {
        fallbackReply =
          "죄송합니다. 저는 김진호 디렉터님의 포트폴리오 및 프로젝트 의뢰와 관련된 내용에만 답변드릴 수 있습니다.\n작업 스타일, 견적, 협업 방식에 대해 궁금하신 점이 있으시다면 언제든 말씀해 주세요!";
      } else if (userText.includes("단가") || userText.includes("얼마") || userText.includes("견적")) {
        fallbackReply =
          "김진호 디렉터님의 프로젝트 기본 단가는 80만 원부터 시작하며, 공간 기획/인테리어는 평당 120만 원 선에서 기본 협의됩니다. 기본 작업 소요기간은 2주~4주입니다. 자세한 조건 협의는 상단 메뉴나 의뢰 접수를 통해 문의해 주시면 직접 연락드립니다.";
      } else if (userText.includes("프로젝트") || userText.includes("사례") || userText.includes("작업")) {
        fallbackReply =
          "김진호 디렉터님은 성수동 '카페 르보' 브랜딩 및 45평 공간 인테리어, '아틀리에 베이커리' 친환경 패키지 디자인, 60평 미니멀 쇼룸 시공 등 다수의 프로젝트를 총괄하셨습니다. 상단 'Projects' 메뉴에서 고해상도 작업물을 보실 수 있습니다.";
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: fallbackReply,
        suggestions: ["기본 단가와 일정은?", "어떤 프로젝트들을 진행했나요?"],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. 닫힌 상태: 원형 60x60 플로팅 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="AI 챗봇 열기"
        >
          <MessageSquareQuote className="w-7 h-7 group-hover:rotate-6 transition-transform" />
          {/* 초록 활동 펄스 점 */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0F1015] animate-pulse" />
        </button>
      )}

      {/* 2. 열린 상태: 데스크톱 400x500 팝업 / 모바일 100dvh 전체화면 */}
      {isOpen && (
        <div className="fixed z-50 inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[520px] flex flex-col bg-[#0F1015] md:bg-[#191A23] border-none md:border md:border-border/80 md:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* 헤더 */}
          <ChatHeader onClose={() => setIsOpen(false)} />

          {/* 대화 내역 스크롤 영역 */}
          <div
            ref={scrollAreaRef}
            className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#0F1015]/60"
          >
            {messages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                onSelectSuggestion={handleSendMessage}
              />
            ))}

            {isLoading && <TypingIndicator />}
          </div>

          {/* 하단 메시지 입력창 */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      )}
    </>
  );
}

