# [PRD Module 05] 성공 기준 및 개발 로드맵 (Success Criteria & Roadmap)

> **상위 문서**: [마스터 PRD (PRD.md)](../PRD.md)  
> **이전 문서**: [04. 비기능 요구사항 및 모바일 최적화 (04_non_functional_and_mobile.md)](./04_non_functional_and_mobile.md)  
> **버전**: v1.1 | **상태**: 확정 (Approved)

---

## 1. 성공 기준 (Acceptance Criteria / Definition of Done)

아래 5개 핵심 기준이 실제 프로덕션 환경(Vercel + Supabase)에서 모두 결함 없이 통과되었을 때 InterFolio MVP 개발이 성공적으로 완료된 것으로 공식 판정합니다.

| ID | 성공 판정 기준 (AC) | 검증 시나리오 및 방법 | 통과 기준 |
| :---: | :--- | :--- | :---: |
| **AC-1** | **5분 초고속 온보딩 완성** | 신규 창작자가 가입 후 Gemini 인터뷰(5문 5답)를 진행하여 고유 URL(`/@username`) 포트폴리오 사이트를 생성. | 소요 시간 5분 이내, 프로필/프로젝트 렌더링 정상 |
| **AC-2** | **RAG 정확도 및 무관 질문 방어** | ① 포트폴리오 데이터 기반 질문 5종 질의<br>② 포트폴리오와 무관한 질문(날씨, 일반상식 등) 5종 질의 | ① 사실 일치율 95% 이상<br>② 100% 정형 방어 안내 메시지 출력 |
| **AC-3** | **관리자 이메일 인가 제어** | ① 인가된 이메일로 로그인 후 `/admin` 진입<br>② 미인가 이메일 및 비로그인 상태로 `/admin` 진입 | ① 정상 대시보드 열람<br>② 즉시 로그인 리다이렉트 또는 403 차단 |
| **AC-4** | **모바일 실기기 레이아웃 무결성** | 스마트폰(iOS 사파리, 안드로이드 크롬, 카카오톡 인앱 브라우저)에서 포트폴리오 접속 및 가상 키보드 팝업 테스트 | 가로 스크롤(Overflow-X) 0건, 입력창 가림 현상 없음 |
| **AC-5** | **30초 내 카톡 의뢰서 실시간 수신** | 방문자가 AI와 대화 후 견적 의뢰서(이름, 연락처, 예산) 제출 | 30초 이내 창작자 스마트폰 카카오톡 알림톡 도착 |

---

## 2. 단계별 개발 스프린트 로드맵 (Implementation Roadmap)

Antigravity와 함께하는 1인 풀스택 개발을 위해 4단계 스프린트로 분할하여 단계별로 실행합니다.

```
[Sprint 1] 기반 환경 및 DB 셋업 ──> [Sprint 2] AI 온보딩 & 웹 쇼케이스
                                            │
[Sprint 4] 알림톡 연동 & 모바일 QA <── [Sprint 3] RAG 챗봇 & 룰북 가드레일
```

### 🏁 Sprint 1: 프로젝트 기반 환경 및 DB/보안 셋업
- Next.js 14 App Router, Tailwind CSS, Lucide Icons 프로젝트 초기화
- Supabase 프로젝트 생성 및 `pgvector` 확장 활성화
- `profiles`, `projects`, `inquiry_leads` 테이블 DDL 실행 및 RLS 정책 적용
- Next.js Middleware 기반 관리자 이메일 접근 제어(`FEAT-06`) 선행 구현

### 🏁 Sprint 2: AI 인터뷰 온보딩 및 반응형 웹 쇼케이스
- Gemini 1.5 Flash API 연동 및 인터뷰 대화 엔진 구현 (`FEAT-01`)
- 인터뷰 답변을 바탕으로 포트폴리오 JSON 구조화 및 DB 자동 저장
- 4종 테마 프리셋 (`Modern Dark`, `Clean White`, `Agency Magazine`, `Warm Studio`) UI 컴포넌트 개발 (`FEAT-05`)
- `/@username` 동적 라우팅 퍼블릭 페이지 완성

### 🏁 Sprint 3: RAG 챗봇 엔진 및 사전 룰북 가드레일
- 프로젝트 데이터 텍스트 임베딩 생성 및 Supabase pgvector 저장
- RAG 파이프라인 구축 (사용자 질문 벡터화 ➔ 코사인 유사도 검색 ➔ Gemini 답변 스트리밍) (`FEAT-02`)
- 포트폴리오 무관 질문 감지 가드레일 프롬프트 및 정형 방어 메시지 탑재
- 단가/일정 룰북 대조 및 헐값 의뢰 사전 차단 로직 구현 (`FEAT-03`)

### 🏁 Sprint 4: 카카오톡 알림톡 연동, 모바일 최적화 및 최종 배포
- 의뢰서 수집 폼 및 솔라피(Solapi) 카카오 알림톡/문자 API 연동 (`FEAT-04`)
- 창작자 관리자 대시보드(수신된 의뢰서 열람 및 상태 변경) 완성
- 모바일 가상 키보드 대응(`100dvh`, `visualViewport`) 및 인앱 브라우저 호환성 검증
- Vercel 프로덕션 배포 및 AC-1 ~ AC-5 최종 Acceptance Testing 수행

---
👉 **마스터 문서로 돌아가기**: [PRD.md](../PRD.md)

