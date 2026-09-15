"use client";

import { useState } from "react";
import { Rulebook } from "@/lib/types";
import { Check, Plus, Trash2, Bot, AlertTriangle } from "lucide-react";

interface RulebookFormProps {
  initialRulebook: Rulebook;
  onSave: (updated: Rulebook) => void;
}

export function RulebookForm({ initialRulebook, onSave }: RulebookFormProps) {
  const [rulebook, setRulebook] = useState<Rulebook>(initialRulebook);
  const [newBlocked, setNewBlocked] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleAddBlocked = () => {
    if (!newBlocked.trim()) return;
    if (rulebook.blocked_requests.includes(newBlocked.trim())) return;
    setRulebook((prev) => ({
      ...prev,
      blocked_requests: [...prev.blocked_requests, newBlocked.trim()],
    }));
    setNewBlocked("");
  };

  const handleRemoveBlocked = (item: string) => {
    setRulebook((prev) => ({
      ...prev,
      blocked_requests: prev.blocked_requests.filter((b) => b !== item),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(rulebook);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>단가/일정 룰북이 AI 어시스턴트에게 성공적으로 반영되었습니다!</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#191A23] border border-border/80 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>AI 견적 & 일정 가드레일</span>
          </div>
          <h3 className="text-base font-bold text-foreground font-heading">
            사전 단가 및 작업 룰북 설정
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            AI 챗봇이 방문자에게 견적이나 일정을 안내할 때 반드시 준수하는 기준입니다.
          </p>
        </div>

        {/* 최소 단가 & 최소 기간 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">
              최소 프로젝트 수주 단가 (원)
            </label>
            <input
              type="number"
              step={50000}
              value={rulebook.min_budget}
              onChange={(e) => setRulebook({ ...rulebook, min_budget: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
            <span className="text-[11px] text-muted">
              이 금액 미만의 요청은 AI가 정중히 1차 거절합니다.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80">
              기본 제작 소요기간 (일)
            </label>
            <input
              type="number"
              min={1}
              value={rulebook.min_duration_days}
              onChange={(e) => setRulebook({ ...rulebook, min_duration_days: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
            <span className="text-[11px] text-muted">
              무리한 단기 납기 요청 차단 기준 (예: 14일)
            </span>
          </div>
        </div>

        {/* 수주 불가 키워드 */}
        <div className="space-y-2 pt-2 border-t border-border/40">
          <label className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-accent" />
            <span>수주 불가 / 거절 작업 키워드</span>
          </label>

          <div className="flex flex-wrap gap-2">
            {rulebook.blocked_requests.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-destructive/15 text-destructive border border-destructive/30"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBlocked(item)}
                  className="hover:opacity-80"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm pt-2">
            <input
              type="text"
              value={newBlocked}
              onChange={(e) => setNewBlocked(e.target.value)}
              placeholder="예: 무료 시안, 불법 카피"
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#0F1015] border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleAddBlocked}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>추가</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            룰북 설정 저장하기
          </button>
        </div>
      </div>
    </form>
  );
}

