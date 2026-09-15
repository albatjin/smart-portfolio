"use client";

import { useState } from "react";
import { initialProfile, initialProjects } from "@/lib/mock-data";
import { Profile, Project, Rulebook } from "@/lib/types";
import { ProfileEditForm } from "@/components/admin/profile-edit-form";
import { ProjectManageTable } from "@/components/admin/project-manage-table";
import { RulebookForm } from "@/components/admin/rulebook-form";
import { User, FolderKanban, Sliders, Sparkles, Inbox } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "rulebook" | "leads">("projects");
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleProfileSave = (updated: Profile) => {
    setProfile(updated);
  };

  const handleProjectsChange = (updated: Project[]) => {
    setProjects(updated);
  };

  const handleRulebookSave = (updatedRulebook: Rulebook) => {
    setProfile((prev) => ({ ...prev, rulebook: updatedRulebook }));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* 대시보드 타이틀 & 탭 바 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
              관리자 스튜디오
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              포트폴리오의 작업물과 AI 챗봇의 지식 기준을 실시간으로 관리합니다.
            </p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex items-center gap-2 border-b border-border/80 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>프로젝트 관리 ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" />
            <span>프로필 & 스킬</span>
          </button>

          <button
            onClick={() => setActiveTab("rulebook")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "rulebook"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>AI 견적/일정 룰북</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "leads"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>수신 의뢰서 (확장)</span>
          </button>
        </div>
      </div>

      {/* 탭 콘텐츠 렌더링 */}
      <div>
        {activeTab === "projects" && (
          <ProjectManageTable
            initialProjects={projects}
            onProjectsChange={handleProjectsChange}
          />
        )}

        {activeTab === "profile" && (
          <ProfileEditForm
            initialData={profile}
            onSave={handleProfileSave}
          />
        )}

        {activeTab === "rulebook" && (
          <RulebookForm
            initialRulebook={profile.rulebook}
            onSave={handleRulebookSave}
          />
        )}

        {activeTab === "leads" && (
          <div className="p-8 rounded-2xl bg-[#191A23] border border-border text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground font-heading">
              의뢰서 실시간 알림 CRM (확장 단계)
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              MVP 배포 후 Phase 6에서 솔라피 카카오 알림톡 API 및 의뢰서 CRM 파이프라인이 탑재될 예정입니다. 현재는 AI 챗봇을 통한 즉각적인 상담 및 포트폴리오 안내가 완벽하게 지원됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

