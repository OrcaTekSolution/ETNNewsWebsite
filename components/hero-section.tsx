import Image from 'next/image';
import Link from 'next/link';
import { LanguageCode, NewsPost } from '@/lib/types';
import { excerpt, formatDate, getNewsImage } from '@/lib/utils';

type WebsiteNewsPost = NewsPost & {
  website_url?: string | null;
};

type HeroSectionProps = {
  posts: NewsPost[];
  lang: LanguageCode;
};

export function HeroSection({ posts, lang }: HeroSectionProps) {
  const websitePosts = posts.filter((post): post is WebsiteNewsPost => {
    const hasWebsiteImage =
      typeof post.image_website === 'string' && post.image_website.trim() !== '';

    const hasWebsiteUrl =
      typeof post.website_url === 'string' && post.website_url.trim() !== '';

    return hasWebsiteImage || hasWebsiteUrl;
  });

  if (!websitePosts.length) return null;

  const [lead, ...rest] = websitePosts;

  const sidebarPosts = rest.slice(0, 3);
  const bottomPosts = rest.slice(3, 6);

  const leadImage = getNewsImage(lead);

  return (
    <section className="etnHero">
      <div className="etnHeroGrid">
        <div className="etnHeroMainColumn">
          <article className="etnHeroLead">
            <Link
              href={`/news/${lead.id}?lang=${lang}`}
              className="etnHeroLeadImageWrap"
            >
              <Image
                src={leadImage}
                alt={lead.title}
                fill
                className="etnHeroLeadImage"
                priority
                sizes="(max-width: 1024px) 100vw, 64vw"
              />

              <div className="etnHeroLeadOverlay" />
            </Link>

            <div className="etnHeroLeadContent">
              <div className="etnHeroLeadTopRow">
                <span className="etnHeroBadge">Top Story</span>
                <span className="etnHeroMetaText">
                  {lead.category_name || 'Featured'}
                </span>
              </div>

              <Link
                href={`/news/${lead.id}?lang=${lang}`}
                className="etnHeroTitleLink"
              >
                <h1 className="etnHeroLeadTitle">{lead.title}</h1>
              </Link>

              <p className="etnHeroLeadExcerpt">{excerpt(lead, 220)}</p>

              <div className="etnHeroLeadMeta">
                <span>{formatDate(lead.published_at || lead.created_at, lang)}</span>
                <span>ETN Live Feed</span>
              </div>
            </div>
          </article>

          {bottomPosts.length > 0 ? (
            <div className="etnHeroBottomGrid">
              {bottomPosts.map((post, index) => {
                const cardImage = getNewsImage(post);

                return (
                  <Link
                    href={`/news/${post.id}?lang=${lang}`}
                    key={post.id}
                    className="etnHeroMiniCard"
                  >
                    <div className="etnHeroMiniThumbWrap">
                      <Image
                        src={cardImage}
                        alt={post.title}
                        fill
                        className="etnHeroMiniThumb"
                        sizes="(max-width: 1024px) 50vw, 280px"
                        priority={index === 0}
                      />
                    </div>

                    <div className="etnHeroMiniContent">
                      <span className="etnHeroMiniCategory">
                        {post.category_name || 'News'}
                      </span>
                      <h3>{post.title}</h3>
                      <p>{excerpt(post, 72)}</p>
                      <span className="etnHeroMiniDate">
                        {formatDate(post.published_at || post.created_at, lang)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <aside className="etnHeroSidebar">
          <div className="etnHeroSidebarHeader">
            <span className="etnHeroSidebarLabel">Top Headlines</span>
            <h2>More stories</h2>
          </div>

          <div className="etnHeroSidebarList">
            {sidebarPosts.map((post, index) => {
              const sideImage = getNewsImage(post);

              return (
                <Link
                  href={`/news/${post.id}?lang=${lang}`}
                  key={post.id}
                  className="etnHeroSideCard"
                >
                  <div className="etnHeroSideThumbWrap">
                    <Image
                      src={sideImage}
                      alt={post.title}
                      fill
                      className="etnHeroSideThumb"
                      sizes="(max-width: 1024px) 30vw, 180px"
                      priority={index < 2}
                    />
                  </div>

                  <div className="etnHeroSideContent">
                    <span className="etnHeroSideCategory">
                      {post.category_name || 'News'}
                    </span>
                    <h3>{post.title}</h3>
                    <p>{excerpt(post, 88)}</p>
                    <span className="etnHeroSideDate">
                      {formatDate(post.published_at || post.created_at, lang)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}