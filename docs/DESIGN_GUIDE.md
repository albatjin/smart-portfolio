# 🎨 [DESIGN_GUIDE] InterFolio 디자인 시스템 가이드

> **디자인 컨셉**: **Warm Minimalist Professional (웜 미니멀 프로페셔널)**  
> **기본 모드**: Dark Mode First (다크 모드 기본)  
> **감성 톤**: 차가운 블루-블랙 대신, 미세한 온기가 감도는 웜 차콜 바탕에 신뢰감 있는 인디고와 따뜻한 앰버(Gold) 포인트의 조화  
> **최종 수정일**: 2026-09-15 (반응형 기준 반영)  

---

## 1. 주요 색상 팔레트 (Color Palette)

일반적인 순수 블랙(`000000`)은 눈의 피로를 유발하고 차가운 느낌을 줍니다. 본 팔레트는 **미세한 웜 톤(Warm Undertone)이 감도는 짙은 흑연색(Charcoal)**을 기반으로 하여 전문적이면서도 온화한 분위기를 연출합니다.

```text
[Background]  [Surface/Card]  [Primary]    [Secondary]   [Accent]      [Text Main]
  #0F1015        #191A23       #6366F1       #262833       #F59E0B       #F3F4F6
 Deep Warm     Elevated Card   Warm Indigo   Warm Slate    Warm Amber    Soft Off-White
```

| 역할 | 명칭 | HEX 코드 | 설명 및 용도 |
| :--- | :--- | :---: | :--- |
| **Background** | Deep Warm Charcoal | `#0F1015` | 전체 페이지의 기본 배경. 완전한 블랙이 아닌 따뜻한 흑연색으로 깊이감 제공 |
| **Surface / Card** | Elevated Warm Gray | `#191A23` | 프로젝트 카드, 챗봇 창, 모달 등의 표면 색상. 배경과 자연스러운 층위 형성 |
| **Primary** | Warm Indigo | `#6366F1` | 메인 브랜드 컬러. 주요 CTA 버튼('프로젝트 보러가기'), 활성 링크, 신뢰감 부여 |
| **Secondary** | Warm Slate | `#262833` | 스킬 태그 뱃지 배경, 비활성 버튼, 보조 컨테이너 |
| **Accent** | Warm Amber | `#F59E0B` | **따뜻함의 핵심 포인트**. AI 챗봇 뱃지, 중요 알림, 별점/성과 지표 강조 |
| **Text (Primary)** | Soft Off-White | `#F3F4F6` | 메인 텍스트, 제목. 100% 흰색 대신 부드러운 오프화이트로 눈부심 방지 |
| **Text (Muted)** | Warm Muted Gray | `#9CA3AF` | 부제목, 설명문, 메타정보(날짜, 기간 등)에 사용되는 차분한 회색 |
| **Border / Line** | Subtle Border | `#2B2D3A` | 카드 테두리, 구분선. 다크 모드에서 요소 간 경계를 은은하게 분리 |

---

## 2. 타이포그래피 (Typography)

Google Fonts에서 100% 무료로 상업적 이용이 가능한 조합으로, 영문의 현대적인 기하학적 매력과 한글의 뛰어난 가독성을 결합했습니다.

### 2.1 제목용 폰트 (Headings)
- **추천 폰트**: **`Plus Jakarta Sans`** (Google Fonts)
- **대체 폰트**: `Outfit` 또는 `Pretendard`
- **특징**: 산세리프 기반으로 글자 폭이 넓고 기하학적 형태를 띠어, 디자이너·개발자의 현대적이고 감각적인 전문성을 단번에 전달함.
- **적용**: `H1(36~44px)`, `H2(28~32px)`, `H3(20~24px)` (Font-Weight: `700 Bold` ~ `800 ExtraBold`)

### 2.2 본문용 폰트 (Body & UI)
- **추천 폰트**: **`Inter`** (영문/UI) + **`Pretendard`** / **`Noto Sans KR`** (한글 본문)
- **특징**: 화면 해상도에 최적화된 높은 가독성(X-height가 큼), 장문의 프로젝트 설명과 AI 챗봇 대화에서도 눈이 피로하지 않음.
- **적용**: 본문(15~16px), 캡션 및 태그(13~14px), 챗봇 말풍선(14px) (Font-Weight: `400 Regular` ~ `500 Medium`)

---

## 3. 전체적인 여백과 간격 기준 (Spacing & Density)

- **선택 기준**: **`comfortable` (여유롭고 편안한 간격)**
- **설정 이유**: 
  - `compact`는 정보 과밀로 답답함을 주고, `spacious`는 모바일에서 과도한 스크롤을 유발함.
  - `comfortable` 기준은 시각적 호흡을 주면서도 프로젝트와 경력 정보를 집중도 있게 탐색할 수 있는 최적의 밸런스를 제공함.
- **구체적 간격 시스템 (Tailwind CSS 매핑)**:
  - **섹션 간 간격**: `py-16 md:py-24` (80px ~ 96px)
  - **컴포넌트/카드 내부 패딩**: `p-5 md:p-6` (20px ~ 24px)
  - **요소 간 간격(Gap)**: 텍스트 간격 `space-y-3` (12px), 카드 그리드 간격 `gap-6 md:gap-8` (24px ~ 32px)
  - **콘테이너 최대 너비**: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 4. 모서리 곡률 스타일 (Corner Radius)

- **선택 기준**: **`rounded` (부드러운 중간 곡률)**
- **설정 이유**: 
  - `sharp(각진)` 모서리는 지나치게 차갑고 공격적인 인상을 주며, `pill(완전 둥근)` 모서리는 포트폴리오의 전문적인 무게감을 떨어뜨릴 수 있음.
  - `rounded`는 현대 테크 기업 및 고급 포트폴리오의 표준으로, 부드러우면서도 단정한 인상을 완성함.
- **요소별 구체적 곡률 값**:
  - **카드 (Card)**: `rounded-xl` (**12px**) ~ `rounded-2xl` (**16px**)
  - **버튼 (Button)**: `rounded-lg` (**8px**) ➔ 단정하고 누르기 편한 비율
  - **입력 필드 (Input)**: `rounded-lg` (**8px**)
  - **스킬 태그 / 상태 뱃지 (Badge)**: `rounded-full` (캡슐형 알약 형태)
  - **AI 챗봇 플로팅 버튼 (FAB)**: `rounded-full` (완전한 60×60 원형)

---

## 5. 그림자 스타일 (Shadow & Elevation)

- **선택 기준**: **`미세` (Subtle Elevation + Border Highlight)**
- **설정 이유**: 
  - 다크 모드에서는 어두운 배경 때문에 전통적인 검은 그림자가 거의 눈에 띄지 않거나 부자연스럽습니다.
  - 따라서 **"미세한 그림자(Subtle Shadow) + 1px의 은은한 경계선(Subtle Border)"**을 결합하여 요소가 배경 위로 살짝 떠 있는 듯한 세련된 깊이감(Depth)을 구현합니다.
- **적용 규칙**:
  - **기본 카드 상태**:
    - `border border-[#2B2D3A]` + `shadow-sm`
  - **카드 호버 상태 (Hover Interaction)**:
    - 살짝 떠오름: `-translate-y-1.5`
    - 테두리 강조: `border-[#6366F1]/50` (Primary 컬러 50% 투명도)
    - 앰비언트 글로우: `shadow-lg shadow-[#6366F1]/10` (미세한 인디고 빛 번짐)
  - **AI 챗봇 위젯 / 모달 윈도우**:
    - `shadow-2xl shadow-black/60 border border-[#2B2D3A]`

---

## 6. [신규 추가] 반응형 디자인 기준 (Responsive Breakpoints)

사용자 디바이스 해상도에 맞춰 3단계 브레이크포인트 시스템을 엄격히 적용합니다.

```text
  [ 모바일 (Mobile) ]         [ 태블릿 (Tablet) ]          [ 데스크톱 (Desktop) ]
      0 ~ 768px                 769 ~ 1024px                    1025px ~
 ──────────────────────   ─────────────────────────   ───────────────────────────
 • 1열 수직 레이아웃       • 2열 카드 그리드           • 3열 카드 그리드
 • 햄버거 메뉴 오버레이     • 축소형/접이식 사이드바    • 풀 네비게이션 메뉴 노출
 • AI 챗봇 전체화면       • 400x500 고정 챗봇         • 400x500 고정 챗봇
```

| 디바이스 구분 | 해상도 범위 (Width) | 핵심 레이아웃 및 UI 규칙 |
| :--- | :---: | :--- |
| **모바일 (Mobile)** | **`0 ~ 768px`** | • **1열 수직 배치 (Single Column)**: 프로젝트 카드 및 히어로 섹션 1열 정렬<br>• **햄버거 메뉴 (Hamburger Menu)**: GNB 텍스트 메뉴 숨김, 우측 햄버거 아이콘 터치 시 드로어 전개<br>• **AI 챗봇 전체화면 (Full-screen)**: 챗봇 오픈 시 모바일 뷰포트 전체(100dvh) 차지, 가상 키보드 밀림 완벽 대응 |
| **태블릿 (Tablet)** | **`769 ~ 1024px`** | • **2열 그리드 (2-Column Grid)**: 프로젝트 및 쇼케이스 카드 2열 배치 (`grid-cols-2`)<br>• **축소형 사이드바 (Collapsed Sidebar)**: 관리자 및 탐색 바를 아이콘 형태 또는 접이식 구조로 전환해 작업 영역 확보<br>• **AI 챗봇 팝업**: 우측 하단 고정 윈도우 (400×500px) |
| **데스크톱 (Desktop)** | **`1025px ~`** | • **3열 그리드 (3-Column Grid)**: 프로젝트 카드 3열 배치 (`grid-cols-3`)<br>• **풀 네비게이션 (Full Navigation)**: 헤더에 모든 메뉴 텍스트 및 CTA 버튼 상시 노출<br>• **좌우 분할 레이아웃**: 히어로 섹션 좌측 사진, 우측 소개 텍스트 배치<br>• **AI 챗봇 팝업**: 우측 하단 고정 윈도우 (400×500px) |

---

## 7. Tailwind CSS 설정 코드 스니펫 (`tailwind.config.js`)

반응형 브레이크포인트와 색상/폰트가 모두 통합된 Tailwind 설정 파일입니다:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    screens: {
      // 3단계 반응형 브레이크포인트 정의
      'sm': '640px',
      'md': '769px',   // 태블릿 시작점 (769px)
      'lg': '1025px',  // 데스크톱 시작점 (1025px)
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: '#0F1015',
        card: '#191A23',
        primary: {
          DEFAULT: '#6366F1',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#262833',
          foreground: '#E5E7EB',
        },
        accent: {
          DEFAULT: '#F59E0B',
          foreground: '#0F1015',
        },
        muted: {
          DEFAULT: '#262833',
          foreground: '#9CA3AF',
        },
        border: '#2B2D3A',
        foreground: '#F3F4F6',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Pretendard', 'sans-serif'],
        body: ['Inter', 'Pretendard', '"Noto Sans KR"', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '8px',
      },
    },
  },
};
```
