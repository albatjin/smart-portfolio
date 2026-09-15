export interface ExperienceItem {
  id: string;
  period: string;       // 예: '2022 - 현재'
  company: string;      // 회사명/스튜디오명
  role: string;         // 직책/역할
  description: string;  // 성과 중심 설명
}

export interface Rulebook {
  min_budget: number;          // 최소 수주 금액 (원)
  min_duration_days: number;   // 최소 작업 소요 기간 (일)
  blocked_requests: string[];  // 수주 불가 키워드 목록
}

export interface Profile {
  id: string;
  email: string;
  username: string;
  full_name: string;
  profession: string;
  bio: string;
  avatar_url: string;
  theme_preset: "modern_dark" | "clean_white" | "agency_magazine" | "warm_studio";
  skills: string[];
  experiences: ExperienceItem[];
  rulebook: Rulebook;
  phone_number?: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  category: "all" | "web" | "app" | "design" | "branding" | "interior" | "etc";
  description: string;
  detail_content?: string;
  tags: string[];
  image_urls: string[];
  live_url?: string;
  github_url?: string;
  created_at?: string;
}

export interface InquiryLead {
  id: string;
  creator_id: string;
  client_name: string;
  client_contact: string;
  budget?: string;
  timeline?: string;
  summary: string;
  chat_log?: Array<{ role: "user" | "assistant"; content: string }>;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

