import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { MainProjectsSection } from "@/components/sections/main-projects-section";
import { initialProjects } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. 히어로 섹션 (200x200 원형 프로필 + 소개 + CTA) */}
      <HeroSection />

      {/* 2. 보유 스킬 섹션 (둥근 모서리 뱃지 그리드) */}
      <SkillsSection />

      {/* 3. 경력 타임라인 섹션 (수직 타임라인) */}
      <ExperienceSection />

      {/* 4. 대표 프로젝트 및 상단 카테고리 필터 섹션 */}
      <MainProjectsSection allProjects={initialProjects} />

      {/* 5. 하단 포트폴리오 유도 배너 */}
      <section className="py-16 bg-[#191A23]/60 border-t border-border/40 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
            더 많은 대표 프로젝트를 확인해 보세요
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            공간 기획, 브랜딩, 패키지 디자인 등 실제 진행된 작업물과 비하인드 스토리가 준비되어 있습니다.
          </p>
          <div className="pt-2">
            <Link
              href="/project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              <span>전체 프로젝트 보러가기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

