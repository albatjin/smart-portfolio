"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageSquareQuote, Sparkles } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot", { detail: { open: true } }));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-[#0F1015]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* 좌측 로고 */}
          {/* 좌측 로고 */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xl font-bold tracking-tight text-foreground font-heading">
              InterFolio<span className="text-primary text-xs ml-1 font-mono">.me</span>
            </span>
          </Link>

          {/* 데스크톱 네비게이션 메뉴 (1025px 이상에서만 노출) */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              소개 (About)
            </Link>
            <Link
              href="/project"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              프로젝트 (Projects)
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              관리자 (Admin)
            </Link>
            
            {/* AI 상담 바로가기 버튼 */}
            <button
              onClick={openChatbot}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25 transition-all shadow-sm"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>24h AI 상담</span>
            </button>
          </nav>

          {/* 모바일 & 태블릿 (< 1025px) 햄버거 메뉴 버튼 */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={openChatbot}
              className="p-2 rounded-lg text-accent hover:bg-secondary/50 transition-colors"
              aria-label="AI 상담 열기"
              title="AI 상담 열기"
            >
              <MessageSquareQuote className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-foreground hover:bg-secondary/50 transition-colors border border-border/60"
              aria-label="메뉴 열기"
              title="메뉴 열기"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 오버레이 드로어 */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenChatbot={openChatbot}
      />
    </>
  );
}

