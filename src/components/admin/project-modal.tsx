"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/types";
import { X, Image as ImageIcon } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export function ProjectModal({ isOpen, project, onClose, onSave }: ProjectModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    category: "branding",
    description: "",
    detail_content: "",
    tags: [],
    image_urls: [""],
    live_url: "",
    github_url: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (project) {
      setFormData(project);
      setTagInput(project.tags.join(", "));
    } else {
      setFormData({
        title: "",
        category: "branding",
        description: "",
        detail_content: "",
        tags: [],
        image_urls: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200"],
        live_url: "",
        github_url: "",
      });
      setTagInput("");
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);

    const savedProject: Project = {
      id: project ? project.id : `proj-${Date.now()}`,
      user_id: project ? project.user_id : "demo-creator-1",
      title: formData.title || "새 프로젝트",
      category: formData.category || "branding",
      description: formData.description || "",
      detail_content: formData.detail_content || "",
      tags,
      image_urls: formData.image_urls && formData.image_urls.length > 0 ? formData.image_urls : ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200"],
      live_url: formData.live_url,
      github_url: formData.github_url,
    };

    onSave(savedProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#191A23] border border-border rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* 모달 헤더 */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-base text-foreground font-heading">
            {project ? "프로젝트 수정" : "새 프로젝트 추가"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">프로젝트 제목 *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="예: 카페 르보 브랜드 & 공간 디렉팅"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">카테고리 *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              >
                <option value="branding">브랜딩</option>
                <option value="interior">공간 인테리어</option>
                <option value="design">그래픽/패키지 디자인</option>
                <option value="web">웹 개발</option>
                <option value="app">앱 개발</option>
                <option value="etc">기타</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="F&B, 로고, 인테리어, 3D"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">대표 이미지 URL (16:9 추천)</label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.image_urls?.[0] || ""}
                onChange={(e) => setFormData({ ...formData, image_urls: [e.target.value] })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">간략 요약 설명 *</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="프로젝트 카드에 노출될 1~2줄 요약 설명"
              className="w-full p-3 rounded-xl bg-[#0F1015] border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">상세 설명 내용 (마크다운 지원)</label>
            <textarea
              rows={5}
              value={formData.detail_content}
              onChange={(e) => setFormData({ ...formData, detail_content: e.target.value })}
              placeholder="프로젝트 상세 페이지에 노출될 본문 내용"
              className="w-full p-3 rounded-xl bg-[#0F1015] border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary font-mono leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">웹사이트 링크 (선택)</label>
              <input
                type="url"
                value={formData.live_url || ""}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">GitHub 링크 (선택)</label>
              <input
                type="url"
                value={formData.github_url || ""}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* 모달 푸터 버튼 */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-muted hover:text-foreground hover:bg-secondary transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20"
            >
              프로젝트 저장하기
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

