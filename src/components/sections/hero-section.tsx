"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { initialProfile } from "@/lib/mock-data";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 border-b border-border/40 overflow-hidden">
      {/* 앰비언트 글로우 배경 효과 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 데스크톱: 좌우 2열 분할 / 모바일: 1열 수직 중앙 정렬 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
          
          {/* 프로필 사진: 정확히 200px x 200px 원형 */}
          <div className="relative shrink-0 flex justify-center">
            <div
              className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl shadow-primary/20 bg-card ring-4 ring-primary/10"
              style={{ borderRadius: "50%", overflow: "hidden" }}
            >
              <Image
                src={initialProfile.avatar_url}
                alt={initialProfile.full_name}
                fill
                sizes="200px"
                priority
                className="object-cover rounded-full"
                style={{ borderRadius: "50%" }}
              />
            </div>
            {/* 상태 뱃지 (24시간 응대 중) */}
            <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191A23] border border-border shadow-lg text-[11px] font-semibold text-emerald-400 z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI 실장 24h 대기 중</span>
            </div>
          </div>

          {/* 텍스트 & CTA 블록 */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border text-xs font-semibold text-primary">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{initialProfile.profession}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-heading leading-tight">
                {initialProfile.full_name}
              </h1>
              <p className="text-lg md:text-xl font-medium text-foreground/80 font-heading">
                공간과 브랜드를 잇는 크리에이티브 파트너
              </p>
            </div>

            <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl">
              {initialProfile.bio}
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              {/* 메인 CTA: '프로젝트 보러가기' -> /project 이동 */}
              <Link
                href="/project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span>프로젝트 보러가기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* 보조 CTA: AI 상담창 열기 트리거 */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("toggle-chatbot", { detail: { open: true } }));
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm bg-card border border-border hover:border-accent/60 text-foreground hover:text-accent transition-all hover:-translate-y-0.5"
              >
                <MessageSquareQuote className="w-4 h-4 text-accent" />
                <span>AI에게 견적·일정 묻기</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

