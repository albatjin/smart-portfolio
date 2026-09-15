"use client";

import { useState } from "react";
import { initialProjects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectFilter } from "@/components/project/project-filter";
import { FolderKanban, Sparkles } from "lucide-react";

const CATEGORIES = [
  { key: "all", label: "전체 보기" },
  { key: "branding", label: "브랜딩" },
  { key: "interior", label: "공간 인테리어" },
  { key: "design", label: "그래픽/패키지" },
  { key: "web", label: "웹 개발" },
];

export default function ProjectListPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = initialProjects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="py-12 md:py-20 bg-[#0F1015] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 상단 타이틀 & 헤더 */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            프로젝트 아카이브
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            브랜드 아이덴티티부터 상업 공간 인테리어, 디지털 쇼케이스까지 직접 기획하고 구축한 대표 프로젝트들입니다.
          </p>
        </div>

        {/* 카테고리 필터 버튼 그룹 */}
        <div className="pt-2">
          <ProjectFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* 프로젝트 카드 그리드: 모바일 1열, 태블릿 2열, 데스크톱 3열 */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-card/40 border border-border space-y-3">
            <Sparkles className="w-8 h-8 text-muted mx-auto" />
            <p className="text-foreground font-semibold">해당 카테고리의 프로젝트가 아직 없습니다.</p>
            <p className="text-xs text-muted">다른 카테고리를 선택하거나 전체 보기를 클릭해 주세요.</p>
          </div>
        )}

      </div>
    </div>
  );
}

