# [PRD Module 04] 비기능 요구사항 및 모바일 최적화 (Non-Functional & Mobile)

> **상위 문서**: [마스터 PRD (PRD.md)](../PRD.md)  
> **이전 문서**: [03. 기술 아키텍처 및 제약사항 (03_technical_architecture.md)](./03_technical_architecture.md)  
> **다음 문서**: [05. 성공 기준 및 로드맵 (05_success_criteria_and_roadmap.md)](./05_success_criteria_and_roadmap.md)  
> **버전**: v1.1 | **상태**: 확정 (Approved)

---

## 1. [최우선 강조] 모바일 완벽 대응 (Strict Mobile-First Design)

### 1.1 배경 및 중요성
실제 클라이언트와 잠재 고객의 **85% 이상은 인스타그램 프로필 링크나 카카오톡 공유 링크를 클릭하여 '스마트폰 인앱 브라우저' 환경에서 접속**합니다. 데스크톱보다 모바일 환경에서의 가독성과 챗봇 인터랙션 완성도가 서비스의 전환율을 전적으로 결정합니다.

### 1.2 모바일 해상도 및 레이아웃 제약
- **뷰포트 대응 범위**: 초소형 스마트폰(가로 320px)부터 최신 대화면 플래그십 기종(430px+), 태블릿, 데스크톱까지 단 1px의 어긋남 없이 반응형 지원.
- **가로 스크롤(Overflow-X) 원천 차단**: 모바일에서 좌우 흔들림 현상이 발생하지 않도록 최상위 컨테이너에 `w-full overflow-x-hidden`을 강제 적용.
- **원터치 조작 편의성 (Touch Target)**:
  - 챗봇 전송 버튼, 테마 선택 버튼, 프로젝트 닫기 버튼 등 모든 인터랙션 요소는 최소 **44px × 44px** 이상의 터치 영역을 확보.
  - 엄지손가락 영역(Thumb Zone)을 고려해 모바일 챗봇 입력창을 화면 최하단에 자연스럽게 고정.

### 1.3 모바일 가상 키보드 인터랙션 (Virtual Keyboard Handling)
스마트폰에서 챗봇 입력 필드를 터치해 가상 키보드가 올라올 때 화면이 잘리거나 레이아웃이 붕괴되는 현상을 기술적으로 완벽히 방어해야 합니다.
1. **동적 뷰포트 단위(`100dvh`) 사용**: 기존 `100vh` 대신 모바일 주소창 및 하단 툴바 변동을 실시간 반영하는 CSS `100dvh` 적용.
2. **`window.visualViewport` API 연동**:
   - 가상 키보드가 팝업되어 뷰포트 높이가 줄어들 경우, 챗봇 대화 리스트의 스크롤을 자동으로 최신 메시지 위치로 스크롤 다운(`scrollIntoView({ behavior: 'smooth' })`).
   - 입력 폼이 키보드 뒤로 숨겨지지 않도록 고정 위치 자동 보정.

### 1.4 인앱 브라우저(In-App Browser) 호환성
- **카카오톡 & 인스타그램 인앱 브라우저 특화 대응**:
  - 인앱 웹뷰에서 `localStorage` 및 쿠키 세션이 유실되지 않도록 Supabase 클라이언트 옵션 최적화.
  - 뒤로가기 제스처 시 의뢰서 작성 중 데이터가 날아가지 않도록 클라이언트 임시 상태(Draft State) 보존.

---

## 2. 성능 요구사항 (Performance Requirements)

| 지표 | 목표 기준 | 최적화 기법 |
| :--- | :---: | :--- |
| **AI 첫 토큰 응답 (TTFT)** | **1.5초 이내** | Server-Sent Events (SSE) 기반 스트리밍 전송, Gemini 1.5 Flash 채택 |
| **초기 페이지 로딩 (LCP)** | **2.0초 이내** | Next.js Server Components (RSC) + Vercel Edge CDN 캐싱 |
| **누적 레이아웃 이동 (CLS)** | **0.05 이하** | 이미지 스켈레톤 UI 및 고정 종횡비(`aspect-ratio`) 사전 할당 |
| **이미지 전송 최적화** | 용량 70% 절감 | Supabase Storage + Next.js `<Image>` 자동 WebP 변환 및 지연 로딩 |

---

## 3. 보안 및 프라이버시 (Security & Privacy)

### 3.1 API Key 완전 격리 (Server-side Isolation)
- `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SOLAPI_API_SECRET` 등 모든 민감한 인증 키는 `.env.local` 및 Vercel 환경 변수로 관리.
- 브라우저 클라이언트 번들에 노출되는 `NEXT_PUBLIC_` 접두사 변수에는 오직 Supabase Anon Key만 허용.

### 3.2 데이터베이스 RLS (Row Level Security)
- 모든 테이블에 RLS를 의무 적용하여 타인의 포트폴리오 비공개 데이터나 수신된 의뢰서 목록을 무단 쿼리하는 것을 DB 엔진 레벨에서 원천 차단.

### 3.3 개인정보 수집 가이드라인 준수
- 방문자가 의뢰서 제출 시 성명, 연락처를 입력할 때 반드시 **"개인정보 수집 및 창작자 제공 동의 (필수)"** 체크박스를 거치도록 구현.
- 전송되는 모든 통신은 SSL/TLS(HTTPS) 암호화 강제.

---

## 4. 접근성 및 사용성 (Accessibility & Usability)

- **키보드 접근성**: 데스크톱 환경에서 마우스 없이도 `Tab` 키로 모든 프로젝트 카드와 챗봇 인터페이스 탐색 가능. 입력창에서 `Enter`로 메시지 전송, `Shift + Enter`로 줄바꿈 지원.
- **스크린리더 대응**: 모든 아이콘 버튼(Lucide Icons)에 명시적인 `aria-label` 부여 (예: `aria-label="챗봇 전송"`, `aria-label="메뉴 닫기"`).
- **다크/라이트 모드 대비비**: WCAG 2.1 AA 기준을 준수하여 텍스트와 배경 간 최소 4.5:1 이상의 명도 대비 유지.

---
👉 **다음 단계**: [05_success_criteria_and_roadmap.md](./05_success_criteria_and_roadmap.md)에서 서비스 완성 판정 기준과 개발 로드맵을 확인하세요.

