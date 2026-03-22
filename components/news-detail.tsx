import Image from 'next/image';
import AdsenseAd from '@/components/adsense-ad';
import { LanguageCode, NewsPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function NewsDetail({
  post,
  lang,
}: {
  post: NewsPost;
  lang: LanguageCode;
}) {
  const publishedDate = formatDate(post.published_at || post.created_at, lang);
  const sourceHref = post.source_url?.trim();

  return (
    <article className="etnArticle">
      <header className="etnArticleHeader">
        <div className="etnArticleHeaderInner">
          <span className="etnArticleBadge">
            {post.category_name || 'ETN News'}
          </span>

          <h1 className="etnArticleTitle">{post.title}</h1>

          {post.short_description ? (
            <p className="etnArticleStandfirst">{post.short_description}</p>
          ) : null}

          <div className="etnArticleMeta">
            <span>{publishedDate}</span>
            {post.author_name ? <span>By {post.author_name}</span> : null}
            {post.source_name ? <span>Source: {post.source_name}</span> : null}
          </div>

          {sourceHref ? (
            <div style={{ marginTop: '18px' }}>
              <a
                href={sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="etnSourceButton"
              >
                Read Full Story from Source ↗
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <div style={{ margin: '20px 0 8px' }}>
        <AdsenseAd
          adSlot="YOUR_AD_SLOT_ID"
          style={{
            minHeight: '100px',
            padding: '12px 0',
          }}
        />
      </div>

      {post.image_url ? (
        <div className="etnArticleHeroMedia">
          <div className="etnArticleImageWrap">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="etnArticleImage"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="etnArticleBodyWrap">
        <div className="etnArticleContent">
          <div
            className="etnArticleBody"
            dangerouslySetInnerHTML={{
              __html:
                post.content ||
                `<p>${post.short_description || 'Full story available on ETN News.'}</p>`,
            }}
          />

          <div style={{ margin: '28px 0' }}>
            <AdsenseAd
              adSlot="YOUR_AD_SLOT_ID"
              style={{
                minHeight: '100px',
                padding: '12px 0',
              }}
            />
          </div>

          <section className="etnReactionPanel">
            <div className="etnReactionBox">
              <strong>{post.like_count ?? 0}</strong>
              <span>Likes</span>
            </div>
            <div className="etnReactionBox">
              <strong>{post.dislike_count ?? 0}</strong>
              <span>Dislikes</span>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}