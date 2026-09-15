# 🛠️ [TECH_STACK] InterFolio 확정 기술 스택 명세서

> **문서 버전**: v2.0 (2026.09 최신 개정판 확정)  
> **기준일자**: 2026-09-15  
> **상위 문서**: [PRD.md](../PRD.md) | [UI_SPEC.md](../UI_SPEC.md) | [DESIGN_GUIDE.md](../DESIGN_GUIDE.md)  
> **개발 도구**: Antigravity Pair Programming  

---

## 📌 기술 스택 총괄 요약표

| 구분 | 기술명 및 권장 버전 | 핵심 역할 (한 줄) | 주요 npm 패키지 | 관련 환경 변수 |
| :--- | :--- | :--- | :--- | :--- |
| **1. Frontend** | `Next.js 16.3+` (React 19) | 풀스택 웹 애플리케이션 프레임워크 및 SSR/ISR 렌더링 | `next`, `react`, `react-dom` | `NEXT_PUBLIC_SITE_URL` |
| **2. Hosting** | `Vercel (Hobby Free)` | 글로벌 Edge CDN 배포, 서버리스 함수 실행 및 CI/CD | `vercel` (CLI) | `VERCEL_URL` (시스템 자동제공) |
| **3. Auth** | `Supabase Auth` (SSR) | 이메일/소셜 인증 및 관리자 이메일 접근 제어(미들웨어) | `@supabase/ssr`, `@supabase/supabase-js` | `ALLOWED_ADMIN_EMAILS` |
| **4. Database** | `Supabase PostgreSQL` (pgvector) | 정형 데이터(프로필/프로젝트/의뢰서) 및 벡터 임베딩 코사인 검색 | `@supabase/supabase-js` | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| **5. Storage** | `Supabase Storage` | 포트폴리오 이미지 저장 및 WebP CDN 자동 변환 | `@supabase/supabase-js` | `NEXT_PUBLIC_SUPABASE_URL` |
| **6. AI Engine** | `Gemini 3.8 Flash` + `AI SDK v7` | 온보딩 인터뷰, 24/7 RAG 상담, 무관 질문 가드레일 방어 | `ai`, `@ai-sdk/google` | `GOOGLE_GENERATIVE_AI_API_KEY` |
| **7. Styling** | `Tailwind CSS v4` + `Shadcn UI` | 웜 다크 디자인 시스템 및 3단계 반응형 레이아웃 구현 | `tailwindcss`, `lucide-react`, `clsx`, `tailwind-merge` | 없음 |
| **8. Messaging** | `솔라피 (Solapi API)` | AI 상담 완료 시 창작자 카카오톡으로 실시간 의뢰서 발송 | `solapi` | `SOLAPI_API_KEY`, `SOLAPI_API_SECRET`, `SOLAPI_PFID` |

---

## 🔍 기술별 상세 명세

### 1. 프론트엔드 프레임워크 (Frontend Framework)
- **기술 이름과 버전**: **`Next.js 16.3.5`** (with `React 19.0.0`, `TypeScript 5.7+`)
- **역할 (한 줄)**: 포트폴리오의 초고속 첫 화면 로딩(SSR)과 동적 라우팅(`/@username`, `/project/[id]`), Server Actions를 총괄하는 메인 프레임워크.
- **필요한 npm 패키지**:
  ```bash
  npm install next@^16.3.5 react@^19.0.0 react-dom@^19.0.0
  npm install -D typescript @types/node @types/react @types/react-dom
  ```
- **필요한 환경 변수**:
  - `NEXT_PUBLIC_SITE_URL`: 서비스의 프로덕션 베이스 도메인 (예: `https://interfolio.me` 또는 `http://localhost:3000`)

---

### 2. 배포 플랫폼 (Deployment Platform)
- **기술 이름과 버전**: **`Vercel Platform (Hobby Tier)`**
- **역할 (한 줄)**: GitHub 리포지토리 연동을 통한 무설정 자동 CI/CD 배포, 무료 글로벌 Edge CDN 캐싱 및 서버리스 API 호스팅.
- **필요한 npm 패키지**:
  ```bash
  npm install -D vercel
  ```
- **필요한 환경 변수**:
  - Vercel 대시보드 프로젝트 설정에서 환경 변수 일괄 등록 (아래 환경 변수 종합 섹션 참조).

---

### 3. 인증 시스템 (Authentication)
- **기술 이름과 버전**: **`Supabase Auth (@supabase/ssr v0.5+)`**
- **역할 (한 줄)**: 관리자 로그인 인증 처리 및 Next.js 미들웨어와 결합하여 인가된 이메일 계정 외 `/admin` 진입을 100% 차단.
- **필요한 npm 패키지**:
  ```bash
  npm install @supabase/supabase-js@^2.48.0 @supabase/ssr@^0.5.2
  ```
- **필요한 환경 변수**:
  - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 고유 API 엔드포인트
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 브라우저 클라이언트용 공개 익명 키 (RLS 보호 적용)
  - `ALLOWED_ADMIN_EMAILS`: 관리자 페이지 접근이 허용된 이메일 목록 (쉼표 구분, 예: `admin@interfolio.me,creator@gmail.com`)

---

### 4. 데이터베이스 및 벡터 엔진 (Database & Vector Engine)
- **기술 이름과 버전**: **`Supabase PostgreSQL 17`** (with **`pgvector 0.8+` HNSW Indexing**)
- **역할 (한 줄)**: 관계형 데이터(창작자 프로필, 프로젝트, 룰북, 의뢰서)와 AI 임베딩 벡터를 단일 DB에서 초고속 코사인 유사도 검색.
- **필요한 npm 패키지**:
  ```bash
  npm install @supabase/supabase-js@^2.48.0
  ```
- **필요한 환경 변수**:
  - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
  - `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 마스터 시크릿 키 (클라이언트에 절대 노출 금지, DB 직접 쿼리 및 벡터 임베딩 저장용)

---

### 5. 파일 스토리지 (File Storage)
- **기술 이름과 버전**: **`Supabase Storage`**
- **역할 (한 줄)**: 프로젝트 대표 이미지 및 프로필 사진을 1GB 무료 한도 내에서 안전하게 저장하고 Next.js Image와 연동해 WebP로 서빙.
- **필요한 npm 패키지**:
  ```bash
  npm install @supabase/supabase-js@^2.48.0
  ```
- **필요한 환경 변수**:
  - `NEXT_PUBLIC_SUPABASE_URL`: 스토리지 버킷 공개 URL 경로 생성에 사용

---

### 6. AI 챗봇 엔진 및 RAG 파이프라인 (AI & RAG Pipeline)
- **기술 이름과 버전**: **`Google Gemini 3.8 Flash`** (with **`Vercel AI SDK v7 / @ai-sdk/google v1.1+`**)
- **역할 (한 줄)**: 5분 온보딩 인터뷰 진행, 포트폴리오 기반 사실 질문 답변, 무관 질문 가드레일 거절 방어, 클라이언트 의뢰서 구조화 추출.
- **필요한 npm 패키지**:
  ```bash
  npm install ai@^4.1.0 @ai-sdk/google@^1.1.0
  ```
- **필요한 환경 변수**:
  - `GOOGLE_GENERATIVE_AI_API_KEY`: Google AI Studio에서 발급받은 Gemini 3.8 API 키 (서버 환경 변수 전용)

---

### 7. 스타일링 및 컴포넌트 라이브러리 (Styling & UI)
- **기술 이름과 버전**: **`Tailwind CSS v4`** + **`Shadcn UI`** + **`Lucide React`** + **`Framer Motion v12`**
- **역할 (한 줄)**: DESIGN_GUIDE에 정의된 웜 다크 팔레트(`#0F1015`), 미세 테두리 그림자, 3단계 반응형 브레이크포인트, 부드러운 애니메이션 구현.
- **필요한 npm 패키지**:
  ```bash
  npm install lucide-react@^0.475.0 clsx@^2.1.1 tailwind-merge@^3.0.0 framer-motion@^12.4.0
  npm install -D tailwindcss@^4.0.0 @tailwindcss/postcss@^4.0.0 postcss@^8.5.0
  ```
- **필요한 환경 변수**: 없음

---

### 8. 알림 연동 시스템 (Messaging Integration)
- **기술 이름과 버전**: **`솔라피 (Solapi API)`** (카카오 비즈메시지 알림톡 / SMS)
- **역할 (한 줄)**: 방문자가 AI와 상담 후 의뢰서를 제출하면 30초 이내에 창작자의 실제 스마트폰 카카오톡으로 의뢰 리포트 즉시 발송.
- **필요한 npm 패키지**:
  ```bash
  npm install solapi@^5.3.0
  ```
- **필요한 환경 변수**:
  - `SOLAPI_API_KEY`: 솔라피 API 인증 키
  - `SOLAPI_API_SECRET`: 솔라피 API 시크릿
  - `SOLAPI_PFID`: 카카오톡 비즈니스 채널 발송 프로필 ID (카카오톡 발송 승인 키)
  - `CREATOR_ALERT_PHONE`: 의뢰서를 수신할 창작자 대표 휴대폰 번호

---

## 🔐 환경 변수 마스터 템플릿 (`.env.local.example`)

```bash
# [1] Next.js 앱 기본 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# [2] Supabase 데이터베이스 / 인증 / 스토리지 (무료 티어)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# [3] 관리자 페이지 접근 제어 화이트리스트 (FEAT-06)
ALLOWED_ADMIN_EMAILS=admin@interfolio.me,jinch@example.com

# [4] Google Gemini 3.8 Flash AI API (무료 티어)
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...

# [5] 카카오톡 알림톡 발송 (Solapi API)
SOLAPI_API_KEY=NCS...
SOLAPI_API_SECRET=...
SOLAPI_PFID=...
CREATOR_ALERT_PHONE=01012345678
```

