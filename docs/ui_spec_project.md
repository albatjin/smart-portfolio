# 📱 [UI 명세서] 프로젝트 목록 및 상세 페이지 (`/project`, `/project/[id]`)

> **문서 버전**: v1.0  
> **화면명**: 프로젝트 목록 및 상세 페이지  
> **URL 경로**: `/project` 및 `/project/[id]`  
> **연관 PRD 기능**: `FEAT-02` (포트폴리오 쇼케이스 & RAG 연동), `FEAT-05` (반응형 테마)  
> **상위 문서**: [PRD.md](../PRD.md) | [UI_SPEC.md](../UI_SPEC.md)  

---

# PART 1. 프로젝트 목록 페이지 (`/project`)

## 1. 레이아웃 구조 (Layout Structure)

```text
┌────────────────────────────────────────────────────────────┐
│ [Header] GNB 네비게이션 바 (메인과 동일, 'Projects' 활성화) │
├────────────────────────────────────────────────────────────┤
│ [Page Title Area] "Featured Projects" + 안내 서브텍스트    │
├────────────────────────────────────────────────────────────┤
│ [Category Filter] [전체] [웹] [앱] [디자인] [브랜딩] [기타] │
├────────────────────────────────────────────────────────────┤
│ [Project Grid]                                             │
│  - 데스크톱: 3열 그리드 (Grid 3 cols)                       │
│  - 태블릿:   2열 그리드 (Grid 2 cols)                       │
│  - 모바일:   1열 세로 배치 (Grid 1 col)                     │
│  [Card 1]            [Card 2]            [Card 3]          │
│  [Card 4]            [Card 5]            [Card 6]          │
├────────────────────────────────────────────────────────────┤
│ [Footer] 공통 푸터 (연락처 정보 + SNS 링크 + InterFolio 뱃지)│
└────────────────────────────────────────────────────────────┘
```

---

## 2. 각 섹션별 상세 명세 (Section Details)

### 2.1 상단 타이틀 및 카테고리 필터
- **타이틀 영역**:
  - 대제목: `Projects` 또는 `Featured Works` (Font-bold, 32px~40px)
  - 서브 카피: *"직접 기획하고 구축한 대표 프로젝트와 작업 결과물입니다."* (16px, `text-muted-foreground`)
- **카테고리 필터 버튼 그룹**:
  - 위치: 타이틀 하단, 좌측 정렬(모바일은 가로 스크롤 가능 `overflow-x-auto no-scrollbar`)
  - 필터 항목: `전체` | `웹` | `앱` | `디자인` | `브랜딩` | `인테리어/기타`
  - 버튼 스타일:
    - **기본 상태**: `px-4 py-2 rounded-full text-sm font-medium bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all`
    - **활성(Active) 상태**: `px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-sm`
  - 인터랙션: 필터 클릭 시 부드러운 페이드 인/아웃(Framer Motion Layout Animation)으로 카드 필터링.

### 2.2 프로젝트 카드 컴포넌트 (Project Card)
- **카드 구성 요소**:
  1. **썸네일 이미지**:
     - 가로세로 비율: **16:9** 고정 (`aspect-video w-full object-cover rounded-t-xl overflow-hidden`)
     - 이미지 최적화: Next.js `<Image>` 컴포넌트, `lazy loading`, WebP 변환
     - 스켈레톤 UI: 로딩 시 연회색 펄스 애니메이션(`animate-pulse bg-muted`)
  2. **카테고리 뱃지**:
     - 썸네일 상단 좌측 오버레이 또는 카드 본문 상단
     - 스타일: `rounded-md px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary w-fit mb-2`
  3. **프로젝트 제목**:
     - 폰트: Font-bold 20px (`text-xl font-bold tracking-tight text-foreground line-clamp-1`)
  4. **간략 설명**:
     - 폰트: 14px, `text-muted-foreground leading-relaxed line-clamp-2 mt-1.5`
     - 예시: *"F&B 프랜차이즈 브랜드 아이덴티티 및 모바일 주문 앱 UI/UX 리뉴얼 프로젝트"*
- **인터랙션 및 효과**:
  - **호버 효과 (Hover Effect)**:
    - 마우스 오버 시 미세 확대: `transform transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]`
    - 그림자 강조: `shadow-sm hover:shadow-xl hover:shadow-primary/10 border border-border/60 hover:border-primary/40`
    - 썸네일 줌: 썸네일 이미지만 살짝 확대(`group-hover:scale-105 transition-transform duration-500`)
  - **클릭 시 동작**:
    - 해당 프로젝트의 고유 ID 경로인 **`/project/[id]`**로 즉시 페이지 이동.

---

## 3. 반응형 동작 명세 (Responsive Behavior)

| 구분 | 모바일 (Mobile, < 768px) | 태블릿 (Tablet, 769px ~ 1024px) | 데스크톱 (Desktop, ≥ 1025px) |
| :--- | :--- | :--- | :--- |
| **그리드 컬럼** | **1열 세로 배치 (grid-cols-1)**<br>카드 간격 `gap-6` | **2열 그리드 (grid-cols-2)**<br>카드 간격 `gap-6` | **3열 그리드 (grid-cols-3)**<br>카드 간격 `gap-8` |
| **카테고리 필터** | 가로 스크롤(Swipe) 허용<br>`flex-nowrap overflow-x-auto pb-2` | 1줄 가로 정렬<br>`flex-wrap gap-2` | 1줄 중앙/좌측 정렬<br>`flex-wrap gap-2.5` |
| **여백 (Container)** | 좌우 패딩 `px-4` | 좌우 패딩 `px-6` | 최대 폭 `max-w-7xl mx-auto px-8` |

---
---

# PART 2. 프로젝트 상세 페이지 (`/project/[id]`)

## 1. 레이아웃 구조 (Layout Structure)

```text
┌────────────────────────────────────────────────────────────┐
│ [Header] GNB 네비게이션 바                                 │
├────────────────────────────────────────────────────────────┤
│ [Top Navigation] [← 목록으로 돌아가기] 카테고리 뱃지        │
├────────────────────────────────────────────────────────────┤
│ [Project Header] 프로젝트 제목 + 기간 / 역할 메타정보      │
├────────────────────────────────────────────────────────────┤
│ [Hero Large Image] 큰 대표 이미지 (16:9 와이드 또는 원본)  │
├────────────────────────────────────────────────────────────┤
│ [Content Grid]                                             │
│  - 본문 영역 (좌측/상단): 프로젝트 배경, 문제 정의, 해결 과정│
│  - 사이드바 (우측/하단): [사용 기술 스택] + [관련 링크 버튼] │
├────────────────────────────────────────────────────────────┤
│ [Bottom Navigation]                                        │
│   [← 이전 프로젝트: OOO]         [다음 프로젝트: XXX →]    │
├────────────────────────────────────────────────────────────┤
│ [Footer] 공통 푸터                                         │
└────────────────────────────────────────────────────────────┘
```

---

## 2. 각 섹션별 상세 명세 (Section Details)

### 2.1 상단 네비게이션 및 헤더 영역
- **뒤로가기 링크**:
  - `← 전체 프로젝트 목록` (클릭 시 `/project`로 이동, 14px, `text-muted-foreground hover:text-foreground`)
- **프로젝트 메타정보 헤더**:
  - 카테고리 뱃지: `Web Application`, `Branding` 등 둥근 사각 뱃지
  - 대제목: 프로젝트 풀네임 (Font-extrabold 32px~44px)
  - 기본 메타정보 칩(가로 배치):
    - `진행 기간`: `2024.03 - 2024.06 (3개월)`
    - `역할`: `기획 및 풀스택 개발 (1인 총괄)`
    - `고객사/소속`: `스튜디오 모던`

### 2.2 큰 대표 이미지 (Large Media Showcase)
- **크기 및 비율**:
  - 데스크톱: 최대 폭 `max-w-5xl`, 와이드 비율 (`aspect-[16/9]` 또는 원본 비율)
  - 스타일: `rounded-2xl border border-border shadow-lg overflow-hidden my-8 w-full object-cover`
- **추가 갤러리 (선택)**:
  - 본문 중간중간 세부 스크린샷이나 시공 전/후(Before & After) 비교 이미지 캐러셀 배치 가능.

### 2.3 프로젝트 상세 설명 (Main Content)
- **마크다운/Rich Text 본문**:
  - **개요 (Overview)**: 프로젝트 목적 및 시작 계기
  - **문제 정의 및 해결 (Problem & Solution)**: 사용자가 겪던 불편함과 창작자가 제시한 솔루션
  - **주요 성과 (Key Results)**: 수치 기반 성과 (예: *"방문자 전환율 35% 향상", "견적 문의 2.4배 증가"*)

### 2.4 사이드바 / 메타 패널 (사이드 또는 본문 하단)
- **사용 기술 (Tech Stack) 섹션**:
  - 라벨: `Technologies Used` (Font-semibold 16px)
  - 기술 뱃지: 둥근 모서리 배경 뱃지 나열 (`Next.js`, `TypeScript`, `Tailwind CSS`, `Supabase`, `Gemini AI` 등)
- **관련 링크 (Action Links)**:
  - **라이브 데모 바로가기**: `[웹사이트 방문하기 ↗]` (Primary Button, 새 창 열기 `target="_blank"`)
  - **깃허브 저장소**: `[GitHub 코드 보기 ↗]` (Secondary Outline Button)
  - **관련 레퍼런스/문서**: `[디자인 피그마 / 제안서 보기]`

### 2.5 이전 / 다음 프로젝트 네비게이션 (Project Pagination)
- **위치**: 본문 최하단, 푸터 바로 위 구분선(`border-t border-b py-8 my-12`)
- **구조**:
  - **좌측 (이전 프로젝트)**:
    - 라벨: `← 이전 프로젝트` (`text-xs text-muted-foreground`)
    - 프로젝트명: `[이전 프로젝트 제목]` (16px, Font-bold, 호버 시 `text-primary`)
    - 첫 번째 프로젝트일 경우: 비활성화 처리 또는 빈 영역
  - **우측 (다음 프로젝트)**:
    - 라벨: `다음 프로젝트 →` (`text-xs text-muted-foreground text-right`)
    - 프로젝트명: `[다음 프로젝트 제목]` (16px, Font-bold, 호버 시 `text-primary`)
    - 마지막 프로젝트일 경우: 비활성화 처리 또는 첫 번째 프로젝트로 루프

---

## 3. 반응형 동작 명세 (Responsive Behavior)

| 구분 | 모바일 (Mobile, < 768px) | 데스크톱 (Desktop, ≥ 1025px) |
| :--- | :--- | :--- |
| **본문 & 메타정보 배치** | • **1열 수직 스택 배치**<br>• 상단 이미지 ➔ 본문 설명 ➔ 하단에 사용 기술 및 관련 링크 버튼 배치 | • **2열 분할 레이아웃 (Content + Sticky Sidebar)**<br>• 좌측(65%): 상세 설명 본문<br>• 우측(35%): 스티키 메타 패널(기술 스택 + 링크 버튼) |
| **큰 대표 이미지** | 화면 가로폭 100% 채움, 모서리 라운딩 `rounded-lg` | 최대 폭 `max-w-5xl`, 여유 있는 여백과 라운딩 `rounded-2xl` |
| **이전/다음 네비게이션** | 상하 2단으로 분할 배치하여 터치 영역 확보 | 좌우 2열 대칭 배치 (좌측 이전, 우측 다음) |
| **관련 링크 버튼** | 폭 100% (`w-full`) 풀 사이즈 버튼으로 엄지 터치 최적화 | 패널 폭에 맞춘 깔끔한 고정 버튼 |

---

## 4. 컴포넌트 파일 구조 제안 (Next.js 14 App Router)

```text
src/
├── app/
│   └── project/
│       ├── page.tsx                      # 프로젝트 목록 페이지 (/project)
│       └── [id]/
│           └── page.tsx                  # 프로젝트 상세 페이지 (/project/[id])
└── components/
    └── project/
        ├── project-card.tsx              # 썸네일+제목+태그+호버효과 카드
        ├── project-filter.tsx            # 카테고리 필터 버튼 그룹
        ├── project-header.tsx            # 상세 헤더 및 메타정보
        ├── project-tech-stack.tsx        # 사용 기술 태그 뱃지 리스트
        ├── project-links.tsx             # 라이브 데모 / 깃허브 액션 링크
        └── project-pagination.tsx        # 이전/다음 프로젝트 네비게이션
```

