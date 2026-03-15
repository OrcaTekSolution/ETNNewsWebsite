import Link from 'next/link';
import { LanguageCode } from '@/lib/types';

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिंदी' },
];

export function LangSwitcher({ currentLang }: { currentLang: LanguageCode }) {
  return (
    <div className="langPills" aria-label="Language selector">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/?lang=${lang.code}`}
          className={currentLang === lang.code ? 'langPill active' : 'langPill'}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
