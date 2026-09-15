import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { initialProjects } from "@/lib/mock-data";
import { ProjectPagination } from "@/components/project/project-pagination";
import { ProjectChatButton } from "@/components/project/project-chat-button";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, Sparkles } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const projectIndex = initialProjects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = initialProjects[projectIndex];
  const prevProject = projectIndex > 0 ? initialProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < initialProjects.length - 1 ? initialProjects[projectIndex + 1] : null;

  const heroImage = project.image_urls[0] || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200";

  return (
    <div className="py-10 md:py-16 bg-[#0F1015] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 상단 뒤로가기 네비게이션 */}
        <div className="flex items-center justify-between">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 프로젝트 목록으로</span>
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-md bg-secondary text-primary font-semibold uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* 프로젝트 헤더 영역 */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-heading leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* 메타정보 바 */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted border-t border-border/40">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>진행 기간: 2024년 상반기</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>역할: 1인 총괄 디렉팅</span>
            </div>
          </div>
        </div>

        {/* 큰 대표 이미지 (16:9 와이드) */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
          <Image
            src={heroImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        {/* 본문 & 사이드바 2열 분할 레이아웃 (모바일은 1열 수직) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          
          {/* 본문 영역 (좌측 8열) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
              {project.detail_content ? (
                <div className="whitespace-pre-line bg-card/40 p-6 sm:p-8 rounded-2xl border border-border/70">
                  {project.detail_content}
                </div>
              ) : (
                <p className="text-muted italic">상세 본문 내용이 준비 중입니다.</p>
              )}
            </div>

            {/* 추가 갤러리 이미지 */}
            {project.image_urls.length > 1 && (
              <div className="space-y-4 pt-6">
                <h3 className="text-lg font-bold text-foreground font-heading">
                  작업 결과물 갤러리
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.image_urls.slice(1).map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                      <Image
                        src={img}
                        alt={`${project.title} gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 사이드바 메타 패널 (우측 4열) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 사용 기술 뱃지 카드 */}
            <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary text-foreground border border-border/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 관련 액션 링크 카드 */}
            {(project.live_url || project.github_url) && (
              <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-3">
                <div className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Project Links
                </div>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-primary/20"
                  >
                    <span>웹사이트 방문하기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground font-medium text-xs flex items-center justify-center gap-2 hover:bg-secondary transition-all"
                  >
                    <span>GitHub 저장소 보기</span>
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* AI에게 비하인드 묻기 CTA */}
            <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-accent">
                <Sparkles className="w-4 h-4" />
                <span>AI 도우미 질문</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                이 프로젝트의 견적, 제작 기간 또는 비슷한 다른 사례가 궁금하신가요?
              </p>
              <ProjectChatButton projectTitle={project.title} />
            </div>

          </div>

        </div>

        {/* 이전 / 다음 프로젝트 네비게이션 */}
        <ProjectPagination prevProject={prevProject} nextProject={nextProject} />

      </div>
    </div>
  );
}

