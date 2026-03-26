'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Category, LanguageCode } from '@/lib/types';
import { EtnLogo } from './etn-logo';
import { LangSwitcher } from './lang-switcher';

const ET_NOW_MARKETS_URL = 'https://www.etnownews.com/markets';
const BUSINESS_TODAY_MARKETS_URL = 'https://www.businesstoday.in/markets';

export function TopNav({
  categories,
  currentLang,
}: {
  categories: Category[];
  currentLang: LanguageCode;
}) {
  const primaryCategories = categories.slice(0, 12);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeLang = searchParams.get('lang') || currentLang;
  const isHome = pathname === '/';

  return (
    <header className="etnHeader">
      <div className="etnTopStrip">
        <div className="container etnTopStripInner">
          <div className="etnBreakingWrap">
            <span className="etnLiveDot" />
            <span className="etnBreakingLabel">LIVE</span>
            <span className="etnBreakingText">
              Market Updates
            </span>

            <div className="etnMarketsLinks">
              <Link
                href={ET_NOW_MARKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="etnMarketButton etnMarketButtonEt"
              >
                ET ↗
              </Link>

              <Link
                href={BUSINESS_TODAY_MARKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="etnMarketButton etnMarketButtonBt"
              >
                BT ↗
              </Link>
            </div>
          </div>

          <div className="etnTopRight">
            <span className="etnEdition">
              {currentLang.toUpperCase()}
            </span>
            <LangSwitcher currentLang={currentLang} />
          </div>
        </div>
      </div>

      <div className="etnBrandBar">
        <div className="container etnBrandBarInner">
          <div className="etnBrandLeft">
            <EtnLogo compact />

            <div className="etnTaglineWrap">
              <span className="etnTaglineMain">ETN News</span>
              <span className="etnTaglineSub">News. Trust. Impact.</span>
            </div>
          </div>

          <form action="/search" className="etnSearchForm" role="search">
            <input type="hidden" name="lang" value={currentLang} />

            <input
              name="q"
              placeholder="Search ETN news, topics, headlines..."
              aria-label="Search news"
              className="etnSearchInput"
            />

            <button type="submit" className="etnSearchButton">
              Search
            </button>
          </form>
        </div>
      </div>

      <nav className="etnNavBar">
        <div className="container etnNavInner">
          <Link
            href={`/?lang=${activeLang}`}
            className={`etnNavLink ${isHome ? 'etnNavActive' : ''}`}
          >
            Home
          </Link>

          {primaryCategories.map((cat) => {
            const isActive = pathname === `/category/${cat.id}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}?lang=${activeLang}`}
                className={`etnNavLink ${isActive ? 'etnNavActive' : ''}`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}