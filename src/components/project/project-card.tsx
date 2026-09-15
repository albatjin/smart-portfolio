import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    all: "전체",
    web: "웹 개발",
    app: "앱 개발",
    design: "그래픽 디자인",
    branding: "브랜딩",
    interior: "공간 인테리어",
    etc: "기타",
  };

  const thumbnail = project.image_urls[0] || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800";

  return (
    <Link
      href={`/project/${project.id}`}
      className="group flex flex-col rounded-2xl bg-[#191A23] border border-border/80 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* 썸네일 이미지: 16:9 와이드 비율 고정 */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 카테고리 태그 뱃지 */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#0F1015]/80 backdrop-blur-md text-primary border border-primary/30 shadow-sm">
            {categoryLabels[project.category] || project.category}
          </span>
        </div>
      </div>

      {/* 카드 텍스트 정보 */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/70 text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] text-muted self-center">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

