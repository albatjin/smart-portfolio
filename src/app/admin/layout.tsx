"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, FolderKanban, Sliders, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // 세션 쿠키 삭제
    document.cookie = "admin_session=; path=/; max-age=0;";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0F1015] flex flex-col md:flex-row">
      {/* 좌측 사이드바: 240px 폭 고정 */}
      <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-border/80 bg-[#191A23] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* 상단 브랜드 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <span className="font-bold text-sm text-foreground font-heading block">
                  Admin Studio
                </span>
                <span className="text-[10px] text-muted block">InterFolio CMS</span>
              </div>
            </div>
            <Link
              href="/"
              className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-secondary transition-colors"
              title="홈으로 돌아가기"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* 메뉴 안내 */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider px-2 block mb-2">
              Management
            </span>
            <nav className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
                <User className="w-4 h-4" />
                <span>통합 관리 대시보드</span>
              </div>
              <Link
                href="/project"
                target="_blank"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-muted hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <FolderKanban className="w-4 h-4" />
                <span>퍼블릭 갤러리 보기 ↗</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* 하단 로그인 계정 정보 및 로그아웃 */}
        <div className="pt-6 border-t border-border/60 mt-6 space-y-3">
          <div className="px-2">
            <span className="text-[10px] text-muted block">접속 계정</span>
            <span className="text-xs font-medium text-foreground truncate block">
              admin@interfolio.me
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/15 transition-colors border border-destructive/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* 우측 메인 작업 영역 */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

