"use client";

import Link from "next/link";
import { X, MessageSquareQuote, Home, FolderKanban, ShieldCheck } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChatbot: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenChatbot }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* 백드롭 오버레이 */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 슬라이드 시트 드로어 */}
      <div className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#191A23] border-l border-border p-6 shadow-2xl flex flex-col justify-between z-50">
        <div>
          {/* 상단 닫기 헤더 */}
          <div className="flex items-center justify-between pb-6 border-b border-border/60">
            <span className="font-bold text-lg text-foreground font-heading">
              메뉴
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="메뉴 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 메뉴 링크 리스트 */}
          <nav className="flex flex-col gap-2 mt-6">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
            >
              <Home className="w-4 h-4 text-primary" />
              <span>소개 (About)</span>
            </Link>
            <Link
              href="/project"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-primary" />
              <span>프로젝트 (Projects)</span>
            </Link>
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>관리자 대시보드</span>
            </Link>
          </nav>
        </div>

        {/* 하단 24h AI 상담 CTA */}
        <div className="pt-6 border-t border-border/60">
          <button
            onClick={() => {
              onClose();
              onOpenChatbot();
            }}
            className="w-full py-3 px-4 rounded-xl bg-accent text-background font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>24h AI 실장과 상담하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

