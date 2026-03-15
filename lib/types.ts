export type LanguageCode = 'en' | 'ta' | 'hi';

export interface Category {
  id: number;
  name: string;
  slug?: string | null;
  language?: string | null;
  is_active?: boolean;
}

export interface NewsPost {
  id: number;
  category_id?: number | null;
  category_name?: string | null;
  title: string;
  short_description?: string | null;
  content?: string | null;
  image_url?: string | null;
  image_website?: string | null;
  author_name?: string | null;
  source_name?: string | null;
  source_url?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  lang?: string | null;
  like_count?: number;
  dislike_count?: number;
}

export interface FeedResponse {
  page: number;
  limit: number;
  total: number;
  items: NewsPost[];
}