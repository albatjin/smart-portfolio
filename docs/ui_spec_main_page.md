# 📱 [UI 명세서] 메인 페이지 (`/`)

> **문서 버전**: v1.0  
> **화면명**: 메인 페이지 (구 랜딩 페이지)  
> **URL 경로**: `/`  
> **연관 PRD 기능**: `FEAT-01` (온보딩/소개), `FEAT-02` (AI 어시스턴트 연동), `FEAT-05` (반응형 테마)  
> **상위 문서**: [PRD.md](../PRD.md)  

---

## 1. 레이아웃 구조 (Layout Structure)

```text
┌────────────────────────────────────────────────────────────┐
│ [Header] 로고 (좌측)                    GNB 메뉴 (우측)     │
├────────────────────────────────────────────────────────────┤
│ [Hero Section]                                             │
│  - 데스크톱: [프로필 사진 (좌)]  [이름 + 한 줄 소개 + CTA (우)] │
│  - 모바일:   [프로필 사진 (상)] ➔ [이름 + 소개 + CTA (하)]      │
├────────────────────────────────────────────────────────────┤
│ [Skills Section] 보유 스킬 태그 / 뱃지 나열                   │
├────────────────────────────────────────────────────────────┤
│ [Experience Section] 타임라인 형태의 경력 목록               │
├────────────────────────────────────────────────────────────┤
│ [Footer] 연락처 정보 (이메일/전화번호) + SNS 링크 아이콘    │
└────────────────────────────────────────────────────────────┘
```

1. **상단 네비게이션 바 (GNB)**
   - 좌측: 브랜드/창작자 텍스트 로고 (클릭 시 `/` 최상단으로 스크롤 이동)
   - 우측: 주요 메뉴 링크 (`소개`, `스킬`, `경력`, `프로젝트`, `AI 상담`)
2. **히어로 섹션 (Hero)**
   - 원형 프로필 사진 + 창작자 이름 + 전문 직군 타이틀 + 한 줄 소개문 + 메인 CTA 버튼
3. **스킬 섹션 (Skills)**
   - 섹션 타이틀 + 보유 기술 및 역량 태그(뱃지) 그리드/플렉스 나열
4. **경력 섹션 (Experience)**
   - 수직 타임라인 라인 + 연도별 경력 카드 (연도 | 회사/조직명 | 역할 | 상세 설명)
5. **하단 푸터 (Footer)**
   - 대표 연락처 정보 + 소셜 링크 아이콘(Instagram, GitHub, LinkedIn 등) + 카피라이트

---

## 2. 각 섹션별 상세 명세 (Section Details)

### 2.1 상단 네비게이션 바 (GNB)
- **높이**: 데스크톱 `64px` (h-16), 모바일 `56px` (h-14)
- **배경**: 반투명 블러 효과 (`bg-background/80 backdrop-blur-md border-b sticky top-0 z-50`)
- **좌측 로고**:
  - 텍스트 로고: Font-bold 20px, `InterFolio` 또는 창작자 활동명
- **우측 메뉴 (데스크톱)**:
  - 폰트: 15px, Medium (`text-muted-foreground hover:text-foreground transition-colors`)
  - 메뉴 항목: `About` | `Skills` | `Experience` | `Projects` | `AI 상담하기 (Badge 포함)`

---

### 2.2 히어로 섹션 (Hero Section)
- **배치 및 정렬**:
  - **프로필 사진**:
    - 크기: 정확히 **200px × 200px** (`w-[200px] h-[200px]`)
    - 형태: 원형 (`rounded-full overflow-hidden object-cover`)
    - 스타일: 2px 보더 (`border-2 border-primary/20 shadow-md`)
  - **텍스트 블록**:
    - 전문 직군 뱃지: 상단 작은 라벨 (예: `1인 인테리어 디렉터` or `브랜드 디자이너`)
    - 이름: Font-extrabold 36px~44px (`text-3xl md:text-5xl tracking-tight`)
    - 한 줄 소개문: Font-normal 18px~20px (`text-lg md:text-xl text-muted-foreground leading-relaxed`)
      - *예시*: *"공간의 본질을 살리는 10년 차 인테리어 디렉터 김진호입니다. 실시간 AI 상담을 통해 견적과 일정을 바로 확인해보세요."*
  - **메인 CTA 버튼**:
    - 버튼 텍스트: **'프로젝트 보러가기'**
    - 액션/이동: 클릭 시 **`/project`** 경로로 페이지 전환 (또는 동적 앵커 스크롤)
    - 스타일: 둥근 사각(`rounded-lg px-6 py-3 font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25`)
    - 보조 CTA (선택): `[AI 실장과 바로 상담하기]` (우측 보조 아웃라인 버튼)

---

### 2.3 스킬 섹션 (Skills Section)
- **섹션 타이틀**: `Skills & Expertise` (Font-bold 28px, 중앙 또는 좌측 정렬)
- **스킬 태그(뱃지) 스타일**:
  - 형태: 모서리가 둥근 캡슐형 뱃지 (`rounded-full px-4 py-2 text-sm font-medium`)
  - 색상: 은은한 배경색과 테두리 적용 (`bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/50 transition-colors`)
  - 배치: 유동적 줄바꿈(`flex flex-wrap gap-2.5 justify-start md:justify-center`)
  - *스킬 태그 예시*:
    - 디자이너: `UI/UX Design`, `Figma`, `Brand Identity`, `Logo Design`, `Typography`, `Design System`
    - 인테리어: `상가 리모델링`, `3D 스케치업`, `철거 및 목공`, `단열 시공`, `감리 및 공정관리`

---

### 2.4 경력 타임라인 섹션 (Experience Section)
- **섹션 타이틀**: `Work Experience` (Font-bold 28px)
- **타임라인 구조**:
  - 좌측 수직 가이드라인(`border-l-2 border-muted relative ml-4 md:ml-32`)
  - 각 경력 아이템마다 동그란 불릿 노드(`w-3 h-3 rounded-full bg-primary absolute -left-[7px]`)
- **데이터 필드 구성**:
  - **연도 (Period)**: `2022 - 현재` (Font-semibold, 14px, `text-primary`)
  - **회사명/조직명 (Company)**: `스튜디오 모던 (대표 / 수석 디자이너)` (Font-bold, 18px)
  - **역할 (Role)**: `브랜드 아이덴티티 및 패키지 총괄 디렉팅` (Font-medium, 15px, `text-foreground/90`)
  - **간략 설명 (Description)**: 2~3줄의 성과 중심 설명문 (`text-sm text-muted-foreground mt-1`)
    - *예시*: *"F&B 및 테크 스타트업 30개 이상의 브랜드 론칭 프로젝트 총괄, 평균 만족도 98% 달성."*

---

### 2.5 하단 푸터 (Footer)
- **상단 구분선**: `border-t border-border mt-20 pt-12 pb-16`
- **연락처 정보 (Contact Info)**:
  - 이메일: `contact@creator.com` (클릭 시 `mailto:` 링크)
  - 문의/전화: `010-XXXX-XXXX` (모바일 터치 시 즉시 `tel:` 전화 걸기 연동)
- **SNS 링크 아이콘**:
  - `Instagram`, `GitHub`, `LinkedIn`, `Blog/Brunch` 아이콘 (Lucide Icons, 24px)
  - 스타일: 호버 시 색상 전환 (`hover:text-primary transition-colors`)
- **하단 카피라이트 & 바이럴 뱃지**:
  - `© 2026 [창작자명]. All rights reserved.`
  - `Powered by InterFolio (5분 만에 내 AI 포트폴리오 만들기)` 링크

---

## 3. 반응형 동작 명세 (Responsive Behavior)

| 구분 | 모바일 (Mobile, < 768px) | 데스크톱 (Desktop, ≥ 768px) |
| :--- | :--- | :--- |
| **GNB 네비게이션** | • 텍스트 메뉴 숨김<br>• **우측 햄버거 메뉴 아이콘(≡)** 노출<br>• 터치 시 우측에서 슬라이드되는 오버레이 시트(Sheet Drawer) 전개 | • 가로 형태의 텍스트 메뉴 리스트 전체 노출<br>• 햄버거 메뉴 숨김 |
| **히어로 섹션 레이아웃** | • **1열 수직(Vertical) 배치**<br>• 상단: 프로필 사진 (200x200 가운데 정렬)<br>• 하단: 이름, 한 줄 소개, CTA 버튼 중앙 정렬 | • **좌우 2열 분할(Horizontal) 배치**<br>• 좌측: 프로필 사진 (200x200)<br>• 우측: 이름, 소개, CTA 버튼 좌측 정렬 |
| **스킬 뱃지** | • 화면 폭에 맞추어 유동적 줄바꿈(Flex-wrap)<br>• 폰트 크기 `13px`, 패딩 소폭 축소 | • 넓은 여백을 활용한 여유 있는 뱃지 배치<br>• 호버 시 부드러운 확대(Scale-up) 인터랙션 |
| **경력 타임라인** | • 모바일 화면 폭을 고려해 날짜/회사명을 1열 수직으로 스택 표출 | • 좌측에 연도/기간 고정 배치, 우측에 회사명/설명 배치 (가독성 극대화) |
| **AI 퀵 플로팅 버튼** | • 화면 우측 하단에 고정 플로팅 챗봇 아이콘 노출 (터치 시 바텀시트 전개) | • 헤더 GNB 버튼 또는 우측 하단 고정 위젯 형태 지원 |

---

## 4. 컴포넌트 파일 구조 제안 (Next.js 14)

```text
src/
├── app/
│   └── page.tsx                 # 메인 페이지 메인 엔트리
└── components/
    ├── navigation/
    │   ├── navbar.tsx           # 상단 GNB (데스크톱/모바일 햄버거 통합)
    │   └── mobile-nav.tsx       # 모바일 슬라이드 시트 메뉴
    ├── sections/
    │   ├── hero-section.tsx     # 200x200 원형 프로필 + 반응형 좌우/상하 분할
    │   ├── skills-section.tsx   # 둥근 모서리 배경 뱃지 그리드
    │   └── experience-section.tsx # 수직 타임라인 리스트
    └── layout/
        └── footer.tsx           # 연락처 + SNS 링크 + InterFolio 뱃지
```

