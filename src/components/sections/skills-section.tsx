import { initialProfile } from "@/lib/mock-data";
import { Wrench } from "lucide-react";

export function SkillsSection() {
  return (
    <section className="py-16 border-b border-border/40 bg-[#0F1015]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Skills & Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
            보유 핵심 역량 및 기술 스택
          </h2>
          <p className="text-sm text-muted max-w-xl">
            디렉터가 직접 실무에서 활용하는 기획, 디자인, 시공 및 개발 스택입니다.
          </p>
        </div>

        {/* 둥근 모서리 뱃지 그리드 / 플렉스 나열 */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {initialProfile.skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#191A23] text-foreground border border-border/80 hover:border-primary/60 hover:text-primary transition-all shadow-sm hover:scale-105 cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

