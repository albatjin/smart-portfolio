"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { Check, Plus, Trash2, Sparkles } from "lucide-react";

interface ProfileEditFormProps {
  initialData: Profile;
  onSave: (updated: Profile) => void;
}

export function ProfileEditForm({ initialData, onSave }: ProfileEditFormProps) {
  const [profile, setProfile] = useState<Profile>(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (profile.skills.includes(newSkill.trim())) return;
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* 알림 메시지 */}
      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>프로필 및 이력 정보가 성공적으로 저장되었습니다!</span>
        </div>
      )}

      {/* 1. 기본 정보 */}
      <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-4">
        <h3 className="text-base font-bold text-foreground font-heading flex items-center gap-2">
          <span>기본 프로필 정보</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">이름 / 활동명</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">전문 직군 타이틀</label>
            <input
              type="text"
              value={profile.profession}
              onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80">한 줄 자기소개 (Bio)</label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-3 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground focus:outline-none focus:border-primary leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">연락용 이메일</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">휴대폰 번호</label>
            <input
              type="text"
              value={profile.phone_number || ""}
              onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
              placeholder="010-0000-0000"
              className="w-full px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* 2. 스킬 관리 */}
      <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-4">
        <h3 className="text-base font-bold text-foreground font-heading">
          보유 스킬 태그 관리
        </h3>

        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-foreground border border-border"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-destructive transition-colors"
                title="삭제"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 max-w-sm pt-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="새 스킬 입력 (예: Next.js)"
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>추가</span>
          </button>
        </div>
      </div>

      {/* 3. 경력 타임라인 관리 */}
      <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-4">
        <h3 className="text-base font-bold text-foreground font-heading">
          경력 타임라인 목록
        </h3>

        <div className="space-y-3">
          {profile.experiences.map((exp, idx) => (
            <div key={exp.id} className="p-4 rounded-xl bg-[#0F1015] border border-border/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary font-mono">{exp.period}</span>
                <span className="text-xs font-bold text-foreground">{exp.company}</span>
              </div>
              <p className="text-xs text-foreground/90 font-medium">{exp.role}</p>
              <p className="text-xs text-muted leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="pt-2">
        <button
          type="submit"
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25"
        >
          프로필 변경사항 저장하기
        </button>
      </div>
    </form>
  );
}

