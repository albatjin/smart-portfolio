-- ==============================================================================
-- [InterFolio] Supabase Initial Seed Data (초기 샘플 데이터)
-- ==============================================================================
-- schema.sql 실행 후, 포트폴리오에 초기 프로젝트 데이터를 채워넣고 싶을 때 실행합니다.

INSERT INTO public.projects (id, title, category, description, detail_content, tags, image_urls, live_url)
VALUES 
(
  'a1b2c3d4-e5f6-4a1b-8c2d-1e2f3a4b5c6d',
  '카페 르보 (Café LeBeau) 브랜드 & 공간 디렉팅',
  'branding',
  '성수동 스페셜티 커피 브랜드 ''르보''의 BI 디자인과 45평 플래그십 매장 공간 리모델링 프로젝트.',
  '## 프로젝트 개요
성수동에 위치한 스페셜티 커피 쇼룸 ''카페 르보''의 브랜드 아이덴티티 수립과 45평 상업 공간 인테리어를 1인 총괄 디렉팅했습니다.

### 해결한 과제 (Problem & Solution)
- **문제**: 기존 공간의 층고가 낮고 조도가 어두워 고객 체류 시간이 짧았음.
- **해결**: 노출 콘크리트와 웜 우드 톤의 대조를 통해 공간감을 극대화하고, 시그니처 웜 앰버 조명을 설계하여 아늑한 브랜드 경험을 완성.

### 주요 성과
- 론칭 첫 달 인스타그램 해시태그 4,200건 돌파
- 주말 평균 고객 대기 시간 40분 기록 및 전월 대비 객단가 32% 상승',
  ARRAY['브랜딩', '공간디자인', 'F&B', '로고디자인', '시공감리'],
  ARRAY[
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop'
  ],
  'https://example.com/lebeau'
),
(
  'b2c3d4e5-f6a1-4b2c-9d3e-2f3a4b5c6d7e',
  '아틀리에 베이커리 (Atelier Bakery) 패키지 리뉴얼',
  'design',
  '친환경 재생지를 활용한 수제 베이커리 기프트 박스 및 쇼핑백 패키지 디자인 시스템 구축.',
  '## 프로젝트 개요
프리미엄 수제 디저트 브랜드 ''아틀리에 베이커리''의 시즌 선물 세트 패키지 3종 및 패키징 가이드라인을 개발했습니다.

### 세부 작업 내용
- FSC 인증 친환경 지류 선정 및 친환경 콩기름 잉크 인쇄 감리
- 시그니처 타이포그래피 엠보싱 후가공 적용',
  ARRAY['패키지디자인', '친환경지류', '그래픽디자인', '인쇄감리'],
  ARRAY[
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=800&fit=crop'
  ],
  'https://example.com/atelier'
),
(
  'c3d4e5f6-a1b2-4c3d-ae4f-3a4b5c6d7e8f',
  '모던 미니멀 쇼룸 (Modern Minimalist Showroom)',
  'interior',
  '가구 디자이너를 위한 60평 규모의 모듈형 전시 쇼룸 및 오피스 복합 공간 인테리어 시공.',
  '## 프로젝트 개요
원목 가구 브랜드의 쇼룸과 작업실이 결합된 하이브리드 공간을 설계 및 직접 시공 감리하였습니다.',
  ARRAY['인테리어', '쇼룸시공', '3D스케치업', '조명설계'],
  ARRAY[
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop'
  ],
  NULL
),
(
  'd4e5f6a1-b2c3-4d4e-bf5a-4a5b6c7d8e9f',
  '크리에이티브 아카이브 웹 쇼케이스',
  'web',
  'Next.js와 Tailwind CSS로 구축한 인터랙티브 디지털 포트폴리오 웹사이트 구축.',
  '## 프로젝트 개요
작업물 아카이빙 및 클라이언트 상담을 위한 고성능 반응형 웹 쇼케이스를 개발하였습니다.',
  ARRAY['Next.js', 'TypeScript', 'TailwindCSS', '반응형웹'],
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop'
  ],
  'https://example.com/archive'
)
ON CONFLICT (id) DO NOTHING;
