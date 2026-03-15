import { Category, FeedResponse, NewsPost } from './types';
import { normalizeLang } from './utils';

const API_BASE_URL =
  process.env.ETN_API_BASE_URL ||
  'https://newsapp-api-aagahrfebxd6fvb2.southindia-01.azurewebsites.net';

function buildUrl(
  path: string,
  query?: Record<string, string | number | undefined | null>
) {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = new URL(cleanPath, base);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const text = String(value).trim();
    if (!text) return;
    url.searchParams.set(key, text);
  });

  return url.toString();
}

async function fetchJson<T>(
  path: string,
  query?: Record<string, string | number | undefined | null>
): Promise<T> {
  const url = buildUrl(path, query);

  let res: Response;

  try {
    res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to connect to ETN API: ${url} :: ${
        error instanceof Error ? error.message : 'Unknown fetch error'
      }`
    );
  }

  const raw = await res.text();

  if (!res.ok) {
    throw new Error(`ETN API error ${res.status} for ${url}: ${raw}`);
  }

  if (!raw.trim()) {
    throw new Error(`ETN API returned empty response for ${url}`);
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`ETN API returned invalid JSON for ${url}: ${raw}`);
  }
}

function filterRecentNews(items: NewsPost[], days: number = 3): NewsPost[] {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - days);

  return items.filter((item) => {
    const rawDate = item.published_at || item.created_at;
    if (!rawDate) return false;

    const itemDate = new Date(rawDate);
    if (Number.isNaN(itemDate.getTime())) return false;

    return itemDate >= cutoff;
  });
}

function normalizeFeedResponse(
  data: FeedResponse | null | undefined,
  fallbackPage: number,
  fallbackLimit: number
): FeedResponse {
  return {
    page: data?.page ?? fallbackPage,
    limit: data?.limit ?? fallbackLimit,
    total: data?.total ?? 0,
    items: Array.isArray(data?.items) ? data.items : [],
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchJson<Category[]>('/categories');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('getCategories failed:', error);
    return [];
  }
}

/**
 * Website-only strategy:
 * 1. Fetch latest published items from API
 * 2. Try filtering only last N days (default 3)
 * 3. If filtered result has items -> use that
 * 4. If filtered result is empty -> fallback to latest available items
 *
 * This prevents empty homepage/category/search pages when no news was added recently.
 */
export async function getNews(params: {
  categoryId?: number;
  page?: number;
  limit?: number;
  q?: string;
  lang?: string;
  days?: number;
}): Promise<FeedResponse> {
  try {
    const page = params.page ?? 1;
    const finalLimit = params.limit ?? 24;

    // Fetch more than needed so website can filter recent items
    // and still have enough items after filtering.
    const requestLimit = Math.max(finalLimit * 3, 50);

    const data = await fetchJson<FeedResponse>('/news', {
      category: params.categoryId,
      page,
      limit: requestLimit,
      q: params.q,
      lang: normalizeLang(params.lang),
    });

    const normalized = normalizeFeedResponse(data, page, requestLimit);
    const allItems = normalized.items;
    const recentItems = filterRecentNews(allItems, params.days ?? 3);

    // Primary: recent news only
    if (recentItems.length > 0) {
      return {
        page,
        limit: finalLimit,
        total: recentItems.length,
        items: recentItems.slice(0, finalLimit),
      };
    }

    // Fallback: latest available news from API response
    return {
      page,
      limit: finalLimit,
      total: allItems.length,
      items: allItems.slice(0, finalLimit),
    };
  } catch (error) {
    console.error('getNews failed:', error);
    return {
      page: params.page ?? 1,
      limit: params.limit ?? 24,
      total: 0,
      items: [],
    };
  }
}

export async function getNewsById(id: number, lang?: string): Promise<NewsPost> {
  return fetchJson<NewsPost>(`/news/${id}`, {
    lang: normalizeLang(lang),
  });
}

export function getCurrentBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export { API_BASE_URL };