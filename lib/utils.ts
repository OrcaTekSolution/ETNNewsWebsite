import { LanguageCode, NewsPost } from './types';

export function normalizeLang(value?: string | null): LanguageCode {
  const v = (value ?? '').trim().toLowerCase();
  if (v === 'ta' || v === 'hi' || v === 'en') return v;
  return 'en';
}

export function formatDate(value?: string | null, lang: LanguageCode = 'en') {
  if (!value) return 'Updated recently';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Updated recently';

  return new Intl.DateTimeFormat(localeFor(lang), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function localeFor(lang: LanguageCode) {
  if (lang === 'ta') return 'ta-IN';
  if (lang === 'hi') return 'hi-IN';
  return 'en-IN';
}

export function stripHtml(input?: string | null) {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function excerpt(
  post: { short_description?: string | null; content?: string | null },
  max = 180
) {
  const raw = stripHtml(post.short_description || post.content || '');

  if (!raw) return 'Tap to read the full story on ETN News.';
  if (raw.length <= max) return raw;

  return `${raw.slice(0, max).trim()}...`;
}

export function buildShareUrl(baseUrl: string, id: number, lang: LanguageCode) {
  return `${baseUrl}/news/${id}?lang=${lang}`;
}

/**
 * Returns the best image for a news post.
 * Priority:
 * 1. image_website
 * 2. image_url
 * 3. local default ETN fallback image
 */
export function getNewsImage(post: Partial<NewsPost>) {
  const websiteImage =
    typeof post.image_website === 'string' ? post.image_website.trim() : '';

  const normalImage =
    typeof post.image_url === 'string' ? post.image_url.trim() : '';

  if (websiteImage) return websiteImage;
  if (normalImage) return normalImage;

  return '/news-default.png';
}