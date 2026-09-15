import { initialProfile } from "@/lib/mock-data";
import { Briefcase } from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0F1015]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
            주요 프로젝트 및 경력 이력
          </h2>
          <p className="text-sm text-muted">
            다양한 브랜드 및 클라이언트와 함께 만들어온 성장의 타임라인입니다.
          </p>
        </div>

        {/* 수직 타임라인 */}
        <div className="relative border-l-2 border-border/80 ml-4 sm:ml-32 space-y-10">
          {initialProfile.experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              {/* 타임라인 불릿 노드 */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors border-2 border-[#0F1015]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                <span className="sm:absolute sm:-left-32 sm:w-24 sm:text-right text-xs font-semibold text-primary font-mono">
                  {exp.period}
                </span>
                <h3 className="text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                  {exp.company}
                </h3>
              </div>

              <div className="text-sm font-medium text-foreground/90 mb-2">
                {exp.role}
              </div>

              <p className="text-sm text-muted leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

