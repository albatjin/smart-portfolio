"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      // 1차 클라이언트 사이드 인가 이메일 검증
      const allowedEmails = (process.env.ALLOWED_ADMIN_EMAILS || "admin@interfolio.me,creator@gmail.com")
        .split(",")
        .map((m) => m.trim().toLowerCase());

      const inputEmail = email.trim().toLowerCase();

      // 데모/관리자 기본 승인 처리
      if (!allowedEmails.includes(inputEmail) && inputEmail !== "admin@interfolio.me") {
        throw new Error("접근 권한이 없는 계정입니다. 사전 등록된 관리자 전용 이메일로 로그인해 주세요.");
      }

      if (password.length < 4) {
        throw new Error("비밀번호는 최소 4자 이상이어야 합니다.");
      }

      // 관리자 세션 쿠키/스토리지 등록 (미들웨어 연동)
      document.cookie = `admin_session=${encodeURIComponent(inputEmail)}; path=/; max-age=86400; SameSite=Lax`;

      // 대시보드로 이동
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0F1015]">
      <div className="w-full max-w-md space-y-6">
        
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>메인 홈으로 돌아가기</span>
        </Link>

        {/* 로그인 카드 */}
        <div className="p-8 rounded-2xl bg-[#191A23] border border-border/80 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              InterFolio Admin
            </h1>
            <p className="text-xs text-muted">
              포트폴리오 및 챗봇 관리를 위해 관리자 계정으로 로그인해 주세요.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 flex items-start gap-2.5 text-xs text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">
                관리자 이메일
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@interfolio.me"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0F1015] border border-border/80 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              {isLoading ? "인증 중..." : "관리자 로그인"}
            </button>
          </form>

          <div className="pt-2 border-t border-border/40 text-center">
            <p className="text-[11px] text-muted leading-relaxed">
              ⚠️ 데모용 허용 이메일: <code className="text-primary">admin@interfolio.me</code><br />
              (비밀번호는 임의의 4자 이상 입력)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

