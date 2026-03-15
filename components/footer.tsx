import Link from 'next/link';
import { EtnLogo } from './etn-logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="etnFooter">
      <div className="container">
        <div className="etnFooterTop">
          <div className="etnFooterBrand">
            <div className="etnFooterLogoWrap">
              <EtnLogo />
            </div>

            <p className="etnFooterIntro">
              ETN News is powered by the same backend used by your ETN mobile and
              admin applications. Any story published through the admin app will
              automatically appear on the website in real time.
            </p>

            <div className="etnFooterTagRow">
              <span className="etnFooterTag">Breaking News</span>
              <span className="etnFooterTag">Politics</span>
              <span className="etnFooterTag">Business</span>
              <span className="etnFooterTag">Sports</span>
              <span className="etnFooterTag">Cinema</span>
              <span className="etnFooterTag">World</span>
            </div>
          </div>

          <div className="etnFooterLinksGrid">
            <div className="etnFooterCol">
              <h4>News</h4>
              <ul>
                <li>
                  <Link href="/">Top Stories</Link>
                </li>
                <li>
                  <Link href="/search?q=breaking">Breaking News</Link>
                </li>
                <li>
                  <Link href="/search?q=india">India</Link>
                </li>
                <li>
                  <Link href="/search?q=world">World</Link>
                </li>
                <li>
                  <Link href="/search?q=politics">Politics</Link>
                </li>
              </ul>
            </div>

            <div className="etnFooterCol">
              <h4>Platform</h4>
              <ul>
                <li>
                  <Link href="/">ETN Home</Link>
                </li>
                <li>
                  <Link href="/search?q=latest">Latest Updates</Link>
                </li>
                <li>
                  <Link href="/search?q=trending">Trending Stories</Link>
                </li>
                <li>
                  <Link href="/search?q=exclusive">Special Reports</Link>
                </li>
              </ul>
            </div>

            <div className="etnFooterCol">
              <h4>Company</h4>
              <ul>
                <li>
                  <a
                    href="https://www.orcateksolution.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Orcatek Solution
                  </a>
                </li>
                <li>
                  <a href="mailto:orcateksolutions@gmail.com">Contact</a>
                </li>
                <li>
                  <Link href="/">ETN News</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="etnFooterBottom">
          <p>© {year} ETN News. All rights reserved.</p>
          <p>Powered by Orcatek Solution</p>
        </div>
      </div>
    </footer>
  );
}