"use client";

import { useState } from "react";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project/project-card";
import { ProjectFilter } from "@/components/project/project-filter";
import Link from "next/link";
import { FolderGit2, ArrowRight, Sparkles } from "lucide-react";

interface MainProjectsSectionProps {
  allProjects: Project[];
}

const CATEGORIES = [
  { key: "all", label: "전체 보기" },
  { key: "branding", label: "브랜딩" },
  { key: "interior", label: "공간 인테리어" },
  { key: "design", label: "그래픽/패키지" },
  { key: "web", label: "웹 개발" },
];

export function MainProjectsSection({ allProjects }: MainProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = allProjects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  return (
    <section className="py-16 md:py-24 border-t border-border/40 bg-[#0F1015]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 상단 타이틀 및 전체보기 링크 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              대표 프로젝트 갤러리
            </h2>
            <p className="text-sm text-muted">
              공간 기획, 브랜딩, 패키지 디자인 등 실제 진행된 대표 작업물입니다.
            </p>
          </div>

          <Link
            href="/project"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group self-start sm:self-auto"
          >
            <span>전체 아카이브 보기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 카테고리 필터 버튼 그룹 */}
        <div>
          <ProjectFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* 반응형 3열 / 2열 / 1열 프로젝트 카드 그리드 */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-card/40 border border-border space-y-3">
            <Sparkles className="w-8 h-8 text-muted mx-auto" />
            <p className="text-foreground font-semibold">해당 카테고리의 프로젝트가 아직 없습니다.</p>
            <p className="text-xs text-muted">다른 카테고리를 선택하거나 전체 보기를 클릭해 주세요.</p>
          </div>
        )}

      </div>
    </section>
  );
}

