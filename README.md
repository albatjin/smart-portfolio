# InterFolio (스마트 포트폴리오)

> **1인 창작자 및 프리랜서를 위한 AI 상담 챗봇 탑재 인터랙티브 포트폴리오 웹 서비스**

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Free-3ECF8E?style=flat-square&logo=supabase)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-3.8_Flash-8E75FF?style=flat-square&logo=google)

---

## 📌 프로젝트 소개 (Overview)

**InterFolio(인터뷰폴리오)**는 단순 열람용 웹사이트에 머물던 기존 포트폴리오를 넘어, **방문자(클라이언트)가 24시간 언제든 AI와 실시간으로 대화하며 견적, 일정, 제작 비하인드를 질의하고 의뢰서를 접수할 수 있는 인터랙티브 포트폴리오 솔루션**입니다.

- **Warm Dark 테마**: 전문성과 시각적 몰입감을 극대화한 `#0F1015` 및 `#6366F1` 인디고 악센트 디자인.
- **철저한 가드레일(Guardrail)**: 날씨, 주식 등 작업 의뢰와 무관한 질문을 원천 차단하고 창작자의 작업 영역으로 자연스럽게 유도.
- **반응형 3단 브레이크포인트**: 모바일(1열 & 햄버거 메뉴), 태블릿(2열), 데스크톱(3열 & 풀 GNB) 완벽 대응.
- **관리자 전용 CMS**: 인가된 이메일 화이트리스트 검증을 통해 프로필, 프로젝트 CRUD, AI 단가/일정 룰북 관리.

---

## 🚀 주요 기능 (Key Features)

1. **메인 페이지 (`/`)**
   - 200×200px 원형 프로필 이미지 + 24시간 실시간 대기 뱃지
   - 핵심 역량 및 기술 스택 뱃지 그리드 (`SkillsSection`)
   - 수직 타임라인 기반 경력 이력 (`ExperienceSection`)
   - 실시간 카테고리 필터가 탑재된 대표 프로젝트 쇼케이스 (`MainProjectsSection`)
2. **프로젝트 아카이브 (`/project`, `/project/[id]`)**
   - 카테고리별 (`전체`, `브랜딩`, `공간 인테리어`, `그래픽/패키지`, `웹 개발`) 필터링
   - 카드 호버 인터랙션 (확대 및 앰비언트 글로우)
   - 프로젝트 상세 정보: 문제 정의 및 해결, 성과 수치, 기술 뱃지, 데모 링크
   - **AI 연동 액션**: '이 프로젝트 AI에게 질문하기' 클릭 시 맞춤 질문 자동 대화
3. **AI 챗봇 상담 위젯 (`ChatbotWidget`)**
   - 우측 하단 60×60px FAB 플로팅 버튼
   - Gemini 3.8 Flash RAG 기반 질의응답
   - 프로젝트 무관 질문 방어 (가드레일 필터)
   - 빠른 질문 추천 칩 동적 제공
4. **관리자 CMS (`/admin`, `/admin/login`)**
   - 허용된 관리자 이메일 목록(`ALLOWED_ADMIN_EMAILS`) 미들웨어 접근 제어
   - 프로필 및 스킬 추가/삭제
   - 프로젝트 등록/수정/삭제 (CRUD) 모달
   - AI 견적 기준, 표준 제작 기간, 차단 키워드 설정 룰북

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 | 설명 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15.1 (App Router)** | React 19 기반 풀스택 프레임워크 |
| **Language** | **TypeScript 5.0+** | 타입 안정성 및 자동 완성 보장 |
| **Styling** | **Tailwind CSS v3** | Warm Dark 팔레트 및 반응형 유틸리티 |
| **Database** | **Supabase (PostgreSQL)** | RLS 보안 정책 및 `pgvector` 벡터 인덱싱 |
| **AI Model** | **Google Gemini 3.8 Flash** | RAG 기반 포트폴리오 질의응답 및 상담 |
| **Icons** | **Lucide React** | 모던 벡터 아이콘 라이브러리 |

---

## 💻 로컬 실행 방법 (Getting Started)

### 1. 레포지토리 클론
```bash
git clone https://github.com/albatjin/smart-portfolio.git
cd smart-portfolio
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local.example`을 복사하여 `.env.local` 파일을 생성하고 키를 입력합니다:
```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-api-key
ALLOWED_ADMIN_EMAILS=admin@interfolio.me,creator@gmail.com
```

### 4. 개발 서버 시작
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인합니다.

---

## 📂 폴더 구조 (Project Structure)

```
smart-portfolio/
├── docs/                     # PRD, UI 명세, 디자인 가이드 분할 설계 문서
├── src/
│   ├── app/                  # Next.js App Router (페이지 및 API 라우트)
│   ├── components/           # UI 컴포넌트 (admin, chatbot, navigation, project, sections)
│   ├── lib/                  # 타입 정의, 목 데이터, Supabase 클라이언트
│   └── middleware.ts         # 관리자 접근 제어 미들웨어
├── supabase/
│   └── schema.sql            # DB 테이블, pgvector 인덱스, RLS SQL
├── .env.local.example        # 환경 변수 템플릿
├── DESIGN_GUIDE.md           # 디자인 시스템 가이드
├── PRD.md                    # 제품 요구사항 정의서
├── TASK_PLAN.md              # 작업 계획 및 WBS
├── TECH_STACK.md             # 기술 스택 사양서
└── UI_SPEC.md                # 통합 UI 명세서
```

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.
