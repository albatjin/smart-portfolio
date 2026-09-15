-- ==============================================================================
-- [InterFolio] Supabase Database Schema (PostgreSQL + pgvector)
-- ==============================================================================

-- 1. pgvector 확장 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. profiles: 창작자 프로필 및 룰북 테이블
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
    "blocked_requests": ["무료 작업", "사후 정산", "불법 카피"]
  }'::jsonb,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. projects: 포트폴리오 작업물 및 벡터 임베딩 테이블
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
  embedding VECTOR(768), -- Gemini 768차원 임베딩
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 코사인 유사도 HNSW 인덱스 생성
CREATE INDEX IF NOT EXISTS projects_embedding_hnsw_idx 
ON public.projects USING hnsw (embedding vector_cosine_ops);

-- 4. inquiry_leads: 유효 의뢰서 및 대화 요약 테이블 (확장 대비)
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

-- 5. RAG 검색용 코사인 유사도 검색 RPC 함수
CREATE OR REPLACE FUNCTION match_projects (
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.5,
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

-- 6. Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_leads ENABLE ROW LEVEL SECURITY;

-- 포트폴리오는 누구나 열람 가능 (Public Read)
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT USING (true);

-- 관리자 본인 데이터 제어 (CRUD)
CREATE POLICY "Users can manage own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own projects" 
ON public.projects FOR ALL USING (auth.uid() = user_id);

-- 의뢰서: 누구나 접수 가능, 조회는 창작자 본인만
CREATE POLICY "Anyone can submit inquiry lead" 
ON public.inquiry_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Creators can view only own leads" 
ON public.inquiry_leads FOR SELECT USING (auth.uid() = creator_id);

