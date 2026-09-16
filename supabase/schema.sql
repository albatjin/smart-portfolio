-- ==============================================================================
-- [InterFolio] Supabase Database Schema & Storage Setup
-- ==============================================================================
-- 본 스크립트는 Supabase SQL Editor에서 'Run' 버튼을 한 번 눌러 전체를 일괄 실행할 수 있습니다.

-- ------------------------------------------------------------------------------
-- 1. pgvector 확장 활성화 (AI 벡터 검색용)
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS vector;

-- ------------------------------------------------------------------------------
-- 2. 핵심 테이블 생성 (Profiles, Projects, Leads)
-- ------------------------------------------------------------------------------

-- 2.1 profiles: 창작자 프로필 및 AI 챗봇 룰북
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  profession TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  theme_preset TEXT DEFAULT 'modern_dark',
  skills TEXT[] DEFAULT '{}',
  experiences JSONB DEFAULT '[]'::jsonb,
  rulebook JSONB DEFAULT '{
    "min_budget": 800000,
    "min_duration_days": 14,
    "blocked_requests": ["무료 작업", "사후 정산", "불법 카피", "3일 이내 급행"]
  }'::jsonb,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.2 projects: 포트폴리오 작업물 및 768차원 Gemini 임베딩
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'web', 'app', 'design', 'branding', 'interior', 'etc'
  description TEXT NOT NULL,
  detail_content TEXT,
  tags TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  embedding VECTOR(768), -- Gemini 768차원 임베딩 벡터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HNSW 인덱스 생성 (코사인 유사도 검색 속도 최적화)
CREATE INDEX IF NOT EXISTS projects_embedding_hnsw_idx 
ON public.projects USING hnsw (embedding vector_cosine_ops);

-- 2.3 inquiry_leads: 챗봇 수신 의뢰서 및 상담 로그 (CRM)
CREATE TABLE IF NOT EXISTS public.inquiry_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_contact TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  summary TEXT NOT NULL,
  chat_log JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. RAG 코사인 유사도 검색 함수 (RPC)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_projects (
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.4,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  category TEXT,
  description TEXT,
  tags TEXT[],
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.title,
    p.category,
    p.description,
    p.tags,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.projects p
  WHERE 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ------------------------------------------------------------------------------
-- 4. 행 수준 보안 (Row Level Security, RLS) 활성화 및 정책 정의
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_leads ENABLE ROW LEVEL SECURITY;

-- 4.1 Profiles 정책
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
CREATE POLICY "Users can manage own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- 4.2 Projects 정책
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own projects" ON public.projects;
CREATE POLICY "Users can manage own projects" 
ON public.projects FOR ALL USING (auth.uid() = user_id);

-- 4.3 Inquiry Leads 정책 (클라이언트는 접수만, 조회는 창작자 본인만)
DROP POLICY IF EXISTS "Anyone can submit inquiry lead" ON public.inquiry_leads;
CREATE POLICY "Anyone can submit inquiry lead" 
ON public.inquiry_leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Creators can view only own leads" ON public.inquiry_leads;
CREATE POLICY "Creators can view only own leads" 
ON public.inquiry_leads FOR SELECT USING (auth.uid() = creator_id);

-- ------------------------------------------------------------------------------
-- 5. 파일 스토리지 (Storage Bucket) 생성 및 정책 설정
-- ------------------------------------------------------------------------------

-- 5.1 포트폴리오 이미지 저장용 공개(Public) 버킷 생성
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-assets',
  'portfolio-assets',
  true,
  10485760, -- 10MB 제한
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 5.2 스토리지 RLS 정책
-- 누구나 이미지 다운로드/열람 가능 (Public Access)
DROP POLICY IF EXISTS "Public Access for Portfolio Assets" ON storage.objects;
CREATE POLICY "Public Access for Portfolio Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- 인증된 관리자만 이미지 업로드 가능
DROP POLICY IF EXISTS "Authenticated Users can Upload Portfolio Assets" ON storage.objects;
CREATE POLICY "Authenticated Users can Upload Portfolio Assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-assets'
  AND auth.role() = 'authenticated'
);

-- 인증된 관리자만 이미지 수정 가능
DROP POLICY IF EXISTS "Authenticated Users can Update Portfolio Assets" ON storage.objects;
CREATE POLICY "Authenticated Users can Update Portfolio Assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-assets'
  AND auth.role() = 'authenticated'
);

-- 인증된 관리자만 이미지 삭제 가능
DROP POLICY IF EXISTS "Authenticated Users can Delete Portfolio Assets" ON storage.objects;
CREATE POLICY "Authenticated Users can Delete Portfolio Assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-assets'
  AND auth.role() = 'authenticated'
);

-- ------------------------------------------------------------------------------
-- 6. 새 관리자 회원가입 시 기본 프로필 자동 생성 트리거
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, full_name, profession, bio, avatar_url)
  VALUES (
    new.id,
    new.email,
    split_part(new.email, '@', 1),
    '김진호',
    '1인 브랜딩 & 공간 디렉터',
    '공간의 본질과 브랜드의 정체성을 연결하는 크리에이티브 디렉터입니다.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
