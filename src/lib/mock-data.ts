import { Profile, Project } from "./types";

export const initialProfile: Profile = {
  id: "demo-creator-1",
  email: "admin@interfolio.me",
  username: "jinho_studio",
  full_name: "김진호",
  profession: "1인 브랜딩 & 공간 디렉터",
  bio: "공간의 본질과 브랜드의 정체성을 연결하는 8년 차 크리에이티브 디렉터입니다. 브랜드 아이덴티티부터 상업 공간 인테리어까지 총괄 디렉팅을 수행합니다.",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
  theme_preset: "modern_dark",
  skills: [
    "브랜드 아이덴티티",
    "상업 공간 기획",
    "3D 스케치업",
    "Figma & UI/UX",
    "현장 감리 & 시공",
    "로고 & 패키지 디자인",
    "Next.js 웹 쇼케이스",
  ],
  experiences: [
    {
      id: "exp-1",
      period: "2022 - 현재",
      company: "스튜디오 모던 (Studio Modern)",
      role: "대표 디렉터 (1인 총괄)",
      description: "F&B 및 리테일 브랜드 30여 곳의 브랜딩과 플래그십 스토어 공간 인테리어 총괄 디렉팅. 평균 프로젝트 만족도 98% 달성.",
    },
    {
      id: "exp-2",
      period: "2019 - 2022",
      company: "에이시스 디자인 에이전시",
      role: "시니어 브랜드 디자이너",
      description: "대기업 및 스타트업의 CI/BI 리뉴얼, 팝업스토어 공간 브랜딩 프로젝트 15건 성공적 론칭.",
    },
    {
      id: "exp-3",
      period: "2017 - 2019",
      company: "아키스페이스 건축사무소",
      role: "공간 기획 및 3D 모델러",
      description: "상업용 근린생활시설 및 카페 인테리어 설계 도면 작성 및 3D 렌더링 시각화.",
    },
  ],
  rulebook: {
    min_budget: 800000,
    min_duration_days: 14,
    blocked_requests: ["무료 시안", "사후 정산", "불법 카피 작업", "3일 이내 초급행"],
  },
  phone_number: "010-9876-5432",
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    user_id: "demo-creator-1",
    title: "카페 르보 (Café LeBeau) 브랜드 & 공간 디렉팅",
    category: "branding",
    description: "성수동 스페셜티 커피 브랜드 '르보'의 BI 디자인과 45평 플래그십 매장 공간 리모델링 프로젝트.",
    detail_content: `## 프로젝트 개요
성수동에 위치한 스페셜티 커피 쇼룸 '카페 르보'의 브랜드 아이덴티티 수립과 45평 상업 공간 인테리어를 1인 총괄 디렉팅했습니다.

### 해결한 과제 (Problem & Solution)
- **문제**: 기존 공간의 층고가 낮고 조도가 어두워 고객 체류 시간이 짧았음.
- **해결**: 노출 콘크리트와 웜 우드 톤의 대조를 통해 공간감을 극대화하고, 시그니처 웜 앰버 조명을 설계하여 아늑한 브랜드 경험을 완성.

### 주요 성과
- 론칭 첫 달 인스타그램 해시태그 4,200건 돌파
- 주말 평균 고객 대기 시간 40분 기록 및 전월 대비 객단가 32% 상승`,
    tags: ["브랜딩", "공간디자인", "F&B", "로고디자인", "시공감리"],
    image_urls: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop",
    ],
    live_url: "https://example.com/lebeau",
  },
  {
    id: "proj-2",
    user_id: "demo-creator-1",
    title: "아틀리에 베이커리 (Atelier Bakery) 패키지 리뉴얼",
    category: "design",
    description: "친환경 재생지를 활용한 수제 베이커리 기프트 박스 및 쇼핑백 패키지 디자인 시스템 구축.",
    detail_content: `## 프로젝트 개요
프리미엄 수제 디저트 브랜드 '아틀리에 베이커리'의 시즌 선물 세트 패키지 3종 및 패키징 가이드라인을 개발했습니다.

### 세부 작업 내용
- FSC 인증 친환경 지류 선정 및 친환경 콩기름 잉크 인쇄 감리
- 시그니처 타이포그래피 엠보싱 후가공 적용`,
    tags: ["패키지디자인", "친환경지류", "그래픽디자인", "인쇄감리"],
    image_urls: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=800&fit=crop",
    ],
    live_url: "https://example.com/atelier",
  },
  {
    id: "proj-3",
    user_id: "demo-creator-1",
    title: "모던 미니멀 쇼룸 (Modern Minimalist Showroom)",
    category: "interior",
    description: "가구 디자이너를 위한 60평 규모의 모듈형 전시 쇼룸 및 오피스 복합 공간 인테리어 시공.",
    detail_content: `## 프로젝트 개요
원목 가구 브랜드의 쇼룸과 작업실이 결합된 하이브리드 공간을 설계 및 직접 시공 감리하였습니다.`,
    tags: ["인테리어", "쇼룸시공", "3D스케치업", "조명설계"],
    image_urls: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
    ],
  },
  {
    id: "proj-4",
    user_id: "demo-creator-1",
    title: "크리에이티브 아카이브 웹 쇼케이스",
    category: "web",
    description: "Next.js와 Tailwind CSS로 구축한 인터랙티브 디지털 포트폴리오 웹사이트 구축.",
    detail_content: `## 프로젝트 개요
작업물 아카이빙 및 클라이언트 상담을 위한 고성능 반응형 웹 쇼케이스를 개발하였습니다.`,
    tags: ["Next.js", "TypeScript", "TailwindCSS", "반응형웹"],
    image_urls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    ],
    live_url: "https://example.com/archive",
    github_url: "https://github.com/example/portfolio",
  },
];

