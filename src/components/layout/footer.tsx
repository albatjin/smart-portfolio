import Link from "next/link";
import { Mail, Phone, Instagram, Github, Linkedin, Sparkles } from "lucide-react";
import { initialProfile } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-[#0F1015] mt-24 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
          {/* 좌측: 창작자 정보 및 연락처 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground font-heading">
                {initialProfile.full_name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                {initialProfile.profession}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              {initialProfile.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-1">
              <a
                href={`mailto:${initialProfile.email}`}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>{initialProfile.email}</span>
              </a>
              {initialProfile.phone_number && (
                <a
                  href={`tel:${initialProfile.phone_number}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{initialProfile.phone_number}</span>
                </a>
              )}
            </div>
          </div>

          {/* 우측: SNS 링크 & InterFolio 바이럴 뱃지 */}
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* 바이럴 뱃지 */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/80 text-[11px] text-muted hover:text-foreground transition-all group"
            >
              <Sparkles className="w-3 h-3 text-primary group-hover:rotate-12 transition-transform" />
              <span>Powered by <strong>InterFolio</strong> (24h AI 포트폴리오)</span>
            </Link>

            <p className="text-[11px] text-muted/60">
              © {new Date().getFullYear()} {initialProfile.full_name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

