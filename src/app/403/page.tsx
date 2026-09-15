import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#0F1015]">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#191A23] border border-border/80 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-destructive/15 border border-destructive/30 flex items-center justify-center text-destructive mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading">
            403 Forbidden
          </h1>
          <p className="text-base font-semibold text-destructive">
            접근 권한이 없는 계정입니다.
          </p>
          <p className="text-xs text-muted leading-relaxed">
            해당 관리자 페이지는 사전에 지정된 관리자 이메일(화이트리스트)로 로그인한 경우에만 접근할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/admin/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            <LogIn className="w-4 h-4" />
            <span>인가 계정으로 로그인</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-medium text-xs hover:bg-secondary/80 border border-border/70 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈으로</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

