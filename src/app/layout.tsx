import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";

export const metadata: Metadata = {
  title: "김진호 디렉터 | 1인 브랜딩 & 공간 디렉터 포트폴리오",
  description: "AI와의 24시간 실시간 상담이 가능한 인터랙티브 포트폴리오 웹사이트입니다. 프로젝트 사례 탐색 및 실시간 견적 문의가 가능합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#0F1015] text-[#F3F4F6] flex flex-col justify-between antialiased selection:bg-primary/30 selection:text-white">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />

        {/* 24시간 전역 플로팅 AI 챗봇 위젯 */}
        <ChatbotWidget />
      </body>
    </html>
  );
}

