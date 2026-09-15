# 🧭 [Master PRD] InterFolio (인터뷰폴리오) 제품 요구사항 정의서

> **문서 버전**: v1.1 (모듈형 분할 완료)  
> **최종 수정일**: 2026-09-14  
> **프로젝트 상태**: 개발 대기 (Ready for Implementation)  
> **핵심 기술 스택**: `Next.js 14 (App Router)` + `Vercel` + `Supabase (pgvector)` + `Gemini 1.5 Flash`  

---

## 📌 서비스 개요 (Executive Summary)

**인터뷰폴리오 (InterFolio)**는 빈 화면을 채우기 힘들어하는 1인 사업자·소상공인·프리랜서를 위해 **AI와의 5분 인터뷰 대화만으로 완성**되며, 낮 시간에 본업으로 바쁜 창작자를 대신해 **AI 어시스턴트가 24시간 방문자를 상담하고 단가 룰북에 따라 유효 견적을 필터링하여 카카오톡으로 의뢰서를 꽂아주는 대화형 세일즈 포트폴리오 웹 빌더**입니다.

---

## 📚 모듈별 상세 요구사항 문서 (Table of Contents)

AI의 컨텍스트 윈도우 한계를 최적화하고 특정 개발 태스크별로 집중 참조할 수 있도록 본 PRD는 5개의 상세 모듈로 체계화되어 있습니다. 작업 영역에 따라 필요한 문서를 참조하십시오.

| 모듈 번호 | 문서명 | 주요 내용 | 링크 |
| :---: | :--- | :--- | :---: |
| **Module 01** | **개요 및 타깃 페르소나** | 프로젝트 배경, 1인 사업자 페인 포인트, 3인 핵심 페르소나(인테리어 실장, 브랜드 디자이너, 마케팅 컨설턴트) | [01_overview_and_personas.md](./docs/01_overview_and_personas.md) |
| **Module 02** | **핵심 기능 명세** | FEAT 01~07 상세 명세, 온보딩 인터뷰, RAG 질의응답, **무관한 질문 방어 가드레일**, 룰북 스크리닝, 카톡 알림톡, **인가 이메일 관리자 접근 제어** | [02_feature_specifications.md](./docs/02_feature_specifications.md) |
| **Module 03** | **기술 아키텍처 & DB** | Vercel+Supabase+Gemini 무료/저비용 아키텍처, 데이터 흐름도, PostgreSQL 스키마, pgvector, RLS 보안 정책, 미들웨어 인증 코드 | [03_technical_architecture.md](./docs/03_technical_architecture.md) |
| **Module 04** | **비기능 요구사항 & 모바일** | **Strict Mobile-First 요구사항**, 320px~430px 반응형, **가상 키보드 팝업 시 레이아웃 대응 (`100dvh`, `visualViewport`)**, 성능 및 보안 기준 | [04_non_functional_and_mobile.md](./docs/04_non_functional_and_mobile.md) |
| **Module 05** | **성공 기준 & 개발 로드맵** | 서비스 완성 판정 5대 Acceptance Criteria (AC-1 ~ AC-5), 스프린트 1~4 단계별 실행 계획 | [05_success_criteria_and_roadmap.md](./docs/05_success_criteria_and_roadmap.md) |

---

## 🤖 AI 코딩 어시스턴트를 위한 개발 지침 (Guidelines for AI Developer)

향후 AI에게 본 프로젝트의 구현을 지시할 때 아래 규칙을 준수하여 프롬프트를 구성하세요:

1. **컨텍스트 최적화 (Token Economy)**:
   - 전체 PRD를 매번 프롬프트에 넣지 말고, 해당 스프린트에서 다루는 모듈 문서만 선택적으로 주입하세요.
   - *예시*: DB 스키마 작업 시 ➔ `docs/03_technical_architecture.md` 참조
   - *예시*: 챗봇 가드레일 작업 시 ➔ `docs/02_feature_specifications.md` 참조
   - *예시*: UI/모바일 반응형 작업 시 ➔ `docs/04_non_functional_and_mobile.md` 참조
2. **비용 제약 원칙 준수**:
   - 추가적인 유료 인프라(유료 서버, 유료 Redis 등)를 제안하지 마십시오. 오직 **Vercel 무료 티어 + Supabase 무료 티어 + Gemini 1.5 Flash 무료 티어** 범위 내에서 서버리스 형태로 개발합니다.
3. **가드레일과 보안 필수 검증**:
   - 챗봇이 포트폴리오 외 엉뚱한 질문에 답변하지 않도록 시스템 프롬프트를 철저히 격리합니다.
   - `/admin` 경로는 반드시 지정된 관리자 이메일 검증 미들웨어를 통과해야만 열리도록 작성합니다.
