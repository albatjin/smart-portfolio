# 💬 [UI 명세서] AI 챗봇 위젯 (AI Chatbot Widget)

> **문서 버전**: v1.0  
> **컴포넌트명**: AI 챗봇 플로팅 위젯 (`ChatbotWidget`)  
> **노출 위치**: 전역 공통 레이아웃 (모든 페이지 우측 하단 고정)  
> **연관 PRD 기능**: `FEAT-02` (RAG 챗봇 & 가드레일 방어), `FEAT-03` (룰북 스크리닝), `FEAT-04` (의뢰서 연결)  
> **상위 문서**: [PRD.md](../PRD.md) | [UI_SPEC.md](../UI_SPEC.md)  

---

## 1. 레이아웃 구조 (Layout Structure)

### 1.1 닫힌 상태 (Collapsed State)
화면 우측 하단에 고정된 원형 플로팅 버튼 (Floating Action Button, FAB).

```text
[화면 우측 하단]
   ┌─────────┐
   │   💬    │  <-- 원형 60px × 60px (호버 시 부드러운 스케일업 & 툴팁)
   └─────────┘
```

### 1.2 열린 상태 (Expanded State)
- **데스크톱**: 우측 하단 팝업 윈도우 (**400px × 500px**)
- **모바일**: 모바일 뷰포트 **전체화면 (Full-screen, 100dvh)**

```text
┌──────────────────────────────────────────────┐
│ [Header] 🤖 포트폴리오 AI 어시스턴트      [✕] │  <-- 상단 고정 헤더
├──────────────────────────────────────────────┤
│ [Message History Area] (스크롤 가능 영역)     │
│                                              │
│ 🤖 AI: "안녕하세요! 포트폴리오에 대해          │
│        궁금한 것이 있으시면 편하게 질문해주세요." │
│                                              │
│                                 👤 사용자:   │
│                          "F&B 작업 사례 있나요?" │
│                                              │
│ 🤖 AI: (타이핑 로딩 애니메이션 •••)           │
├──────────────────────────────────────────────┤
│ [Input Bar]                                  │
│ ┌──────────────────────────────────┐ ┌─────┐ │
│ │ 메시지를 입력하세요...            │ │  ➤  │ │  <-- 하단 입력창 + 전송버튼
│ └──────────────────────────────────┘ └─────┘ │
└──────────────────────────────────────────────┘
```

---

## 2. 각 섹션 및 상태별 상세 명세 (Section & State Details)

### 2.1 닫힌 상태 (Floating Action Button)
- **위치**: 우측 하단 고정 (`fixed bottom-6 right-6 z-50`)
- **크기 및 형태**: 정확히 **60px × 60px** 원형 (`w-[60px] h-[60px] rounded-full`)
- **스타일**:
  - 배경: 브랜드 테마 컬러 (`bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/30`)
  - 아이콘: Lucide `MessageSquareQuote` 또는 `Bot` 아이콘 (28px × 28px)
  - 뱃지(선택): 최초 방문 시 *"AI에게 물어보세요!"* 말풍선 툴팁이 3초간 펄스 후 사라짐
- **인터랙션**:
  - 마우스 호버 시: 살짝 확대 (`hover:scale-110 transition-transform duration-200`)
  - 클릭 시: 닫힌 버튼이 회전하며 사라지고, 400×500 채팅창이 아래에서 위로 부드럽게 슬라이드업(Framer Motion / Transition).

---

### 2.2 열린 상태: 헤더 영역 (Chatbot Header)
- **높이**: `56px` 고정 (`h-14 px-4 flex items-center justify-between border-b bg-card`)
- **좌측 타이틀**:
  - 아이콘 + 텍스트: `🤖 포트폴리오 AI 어시스턴트` (Font-semibold 15px, `text-foreground`)
  - 실시간 상태 점: 초록색 펄스 점 (`w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-1.5`)
- **우측 액션 버튼**:
  - 닫기 버튼: Lucide `X` 아이콘 (`w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors`)
  - 키보드 단축키: `ESC` 키 누를 시 채팅창 즉시 닫힘.

---

### 2.3 열린 상태: 대화 내역 영역 (Message History Area)
- **영역 특성**:
  - 자동 스크롤: 새 메시지 유입 및 타이핑 진행 시 맨 아래로 자동 부드러운 스크롤(`scrollIntoView({ behavior: 'smooth' })`).
  - 배경: `bg-muted/30 p-4 space-y-4 overflow-y-auto flex-1`
- **말풍선 스타일**:
  - **AI 메시지 (좌측 정렬)**:
    - 봇 아바타(28×28px) + 말풍선 (`bg-card text-card-foreground border border-border/60 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm leading-relaxed max-w-[85%] shadow-sm`)
  - **사용자 메시지 (우측 정렬)**:
    - 말풍선 (`bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm leading-relaxed max-w-[85%] shadow-sm ml-auto`)

---

### 2.4 열린 상태: 하단 입력창 영역 (Input Bar)
- **높이/레이아웃**: `p-3 bg-card border-t flex items-end gap-2`
- **입력 필드 (`textarea` 또는 `input`)**:
  - 스타일: `flex-1 min-h-[40px] max-h-[100px] p-2.5 text-sm rounded-xl bg-muted/60 border-none focus:outline-none focus:ring-1 focus:ring-primary resize-none`
  - Placeholder: `"메시지를 입력하세요... (예: 단가 문의)"`
  - 키 바인딩:
    - `Enter`: 메시지 전송 (Shift 없이 단독 누를 때)
    - `Shift + Enter`: 다음 줄 바꿈
- **전송 버튼**:
  - 크기: `w-[40px] h-[40px] rounded-xl flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-all`
  - 아이콘: Lucide `SendHorizonal` (18px)
  - 비활성화: 입력값이 공백이거나 AI 로딩 중일 때 `opacity-50 cursor-not-allowed`

---

## 3. 대화 상태별 UI 상세 명세 (Conversation States)

### 3.1 초기 메시지 (Initial State)
사용자가 채팅창을 열었을 때 자동으로 노출되는 웰컴 메시지:
> **AI**: *"안녕하세요! [창작자명] 작가님의 AI 어시스턴트입니다. 포트폴리오 작업물이나 견적, 일정에 대해 궁금한 점이 있으시면 편하게 질문해 주세요! 😊"*

- **추천 질문 칩(Quick Suggestion Chips)**: 초기 메시지 하단에 원클릭 질문 태그 제공:
  - `[ 대표 프로젝트 보여줘 ]`
  - `[ 기본 단가와 일정은? ]`
  - `[ 협업/의뢰 신청하기 ]`

### 3.2 로딩 상태 (Typing Animation State)
AI가 질문을 분석하고 Gemini 스트리밍 답변을 생성하는 동안 표시되는 인디케이터:
- **UI 표현**:
  - 봇 아바타 옆에 둥근 말풍선 안에서 3개의 작은 점(dot)이 순차적으로 튀어 오르는 바운스 애니메이션 (`animate-bounce`).
  ```html
  <div class="flex items-center gap-1.5 py-1 px-2">
    <span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]"></span>
    <span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]"></span>
    <span class="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
  </div>
  ```

### 3.3 에러 및 가드레일 상태 (Out-of-Scope / Error State)
포트폴리오와 무관한 질문(날씨, 일반 상식, 탈옥 유도 등) 수신 시 정형 안내:
- **안내 메시지**:
  > **AI**: *"죄송합니다. 저는 [창작자명] 작가님의 포트폴리오 및 프로젝트 의뢰와 관련된 내용에만 답변드릴 수 있습니다. 작업 스타일, 견적, 협업 방식에 대해 궁금한 점이 있으시다면 언제든 말씀해 주세요!"*
- **복구 액션**: 말풍선 하단에 `[포트폴리오 질문으로 돌아가기]` 버튼 노출.

---

## 4. 반응형 동작 명세 (Responsive Behavior)

| 구분 | 모바일 (Mobile, < 768px) | 데스크톱 (Desktop, ≥ 1025px) |
| :--- | :--- | :--- |
| **위젯 크기** | **전체화면 (Full-screen, 100dvh)**<br>`inset-0 w-full h-full rounded-none` | **고정 윈도우 (400px × 500px)**<br>`bottom-6 right-6 rounded-2xl shadow-2xl` |
| **모바일 키보드 대응** | • 가상 키보드 팝업 시 `visualViewport` 연동<br>• 입력창이 키보드 바로 위에 오도록 밀어 올림 | 일반 데스크톱 창 형태 유지 |
| **닫기 인터랙션** | 상단 헤더의 `✕` 버튼 터치 시 전체화면 닫힘 | `✕` 버튼 클릭 또는 외부 배경 클릭 시 닫힘 |
| **헤더 네비게이션** | 모바일 상단 안전영역(Safe Area Top) 패딩 적용 | 일반 고정 56px 헤더 |

---

## 5. 컴포넌트 파일 구조 제안 (Next.js 14)

```text
src/
└── components/
    └── chatbot/
        ├── chatbot-widget.tsx         # 열림/닫힘 상태를 제어하는 루트 위젯
        ├── chat-window.tsx            # 400x500 (또는 모바일 전체화면) 컨테이너
        ├── chat-header.tsx            # 상단 제목 + 초록 펄스 점 + 닫기 버튼
        ├── message-list.tsx           # 대화 내역 렌더링 & 자동 스크롤링
        ├── message-item.tsx           # 개별 말풍선 (AI / 사용자 / 추천 칩)
        ├── typing-indicator.tsx       # AI 답변 생성 중 3-dot 바운스 애니메이션
        └── chat-input.tsx             # 텍스트에어리어 + 전송 버튼 (Enter 핸들링)
```

