import Link from "next/link";
import { Project } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPaginationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectPagination({
  prevProject,
  nextProject,
}: ProjectPaginationProps) {
  return (
    <div className="border-t border-b border-border/60 py-8 my-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 이전 프로젝트 */}
        {prevProject ? (
          <Link
            href={`/project/${prevProject.id}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-card/60 border border-border/70 hover:border-primary/50 transition-all group"
          >
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted group-hover:text-primary group-hover:-translate-x-0.5 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </span>
            <div className="overflow-hidden text-left">
              <span className="text-[11px] text-muted block uppercase tracking-wider">
                이전 프로젝트
              </span>
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate block">
                {prevProject.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* 다음 프로젝트 */}
        {nextProject ? (
          <Link
            href={`/project/${nextProject.id}`}
            className="flex items-center justify-end gap-3 p-4 rounded-xl bg-card/60 border border-border/70 hover:border-primary/50 transition-all group sm:text-right"
          >
            <div className="overflow-hidden">
              <span className="text-[11px] text-muted block uppercase tracking-wider">
                다음 프로젝트
              </span>
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate block">
                {nextProject.title}
              </span>
            </div>
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}

