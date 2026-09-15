import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login은 자체 인증 페이지이므로 제외
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const adminSessionCookie = req.cookies.get("admin_session")?.value;

    if (!adminSessionCookie) {
      // 미인증 상태 시 관리자 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 허용된 관리자 이메일 목록 대조
    const allowedEmails = (process.env.ALLOWED_ADMIN_EMAILS || "admin@interfolio.me,creator@gmail.com")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const userEmail = decodeURIComponent(adminSessionCookie).toLowerCase();

    if (!allowedEmails.includes(userEmail)) {
      // 미인가 이메일일 경우 403 Forbidden으로 리다이렉트
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

