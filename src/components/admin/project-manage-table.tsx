"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { ProjectModal } from "./project-modal";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

interface ProjectManageTableProps {
  initialProjects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

export function ProjectManageTable({
  initialProjects,
  onProjectsChange,
}: ProjectManageTableProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      onProjectsChange(updated);
    }
  };

  const handleSave = (savedProject: Project) => {
    let updated: Project[];
    if (editingProject) {
      updated = projects.map((p) => (p.id === savedProject.id ? savedProject : p));
    } else {
      updated = [savedProject, ...projects];
    }
    setProjects(updated);
    onProjectsChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* 툴바 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-foreground font-heading">
            프로젝트 관리 ({projects.length})
          </h3>
          <p className="text-xs text-muted">
            포트폴리오 갤러리에 노출되는 작업물 목록입니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-all shadow-md shadow-primary/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>새 프로젝트 추가</span>
        </button>
      </div>

      {/* 테이블 */}
      <div className="rounded-2xl border border-border/80 bg-[#191A23] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 text-muted font-semibold">
              <tr>
                <th className="py-3 px-4 w-20">썸네일</th>
                <th className="py-3 px-4">프로젝트 제목</th>
                <th className="py-3 px-4 w-28">카테고리</th>
                <th className="py-3 px-4 hidden md:table-cell">태그</th>
                <th className="py-3 px-4 text-right w-24">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-muted border border-border">
                      <Image
                        src={project.image_urls[0] || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-foreground block truncate max-w-xs">
                      {project.title}
                    </span>
                    <span className="text-[11px] text-muted truncate block max-w-xs">
                      {project.description}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-primary font-semibold text-[10px] uppercase">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-muted">
                    {project.tags.slice(0, 2).join(", ")}
                    {project.tags.length > 2 && " ..."}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
                        title="수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-lg text-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 프로젝트 추가/수정 모달 */}
      <ProjectModal
        isOpen={isModalOpen}
        project={editingProject}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

