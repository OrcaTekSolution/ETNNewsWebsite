import Image from 'next/image';
import Link from 'next/link';
import { LanguageCode, NewsPost } from '@/lib/types';
import { excerpt, formatDate, getNewsImage } from '@/lib/utils';

export function NewsCard({
  post,
  lang,
  priority = false,
}: {
  post: NewsPost;
  lang: LanguageCode;
  priority?: boolean;
}) {
  const articleHref = `/news/${post.id}?lang=${lang}`;
  const sourceHref = post.source_url?.trim();
  const displayImage = getNewsImage(post);

  return (
    <article className="newsCard">
      <Link href={articleHref} className="imageWrap">
        <Image
          src={displayImage}
          alt={post.title}
          fill
          className="cardImage"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={priority}
        />

        <div className="imageOverlay" />

        <span className="categoryBadge">
          {post.category_name || 'Latest'}
        </span>
      </Link>

      <div className="content">
        <div className="meta">
          <span>{formatDate(post.published_at || post.created_at, lang)}</span>
          {post.source_name ? (
            <>
              {' • '}
              <span>{post.source_name}</span>
            </>
          ) : null}
        </div>

        <Link href={articleHref} className="title">
          <h3>{post.title}</h3>
        </Link>

        <p className="excerpt">{excerpt(post)}</p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '12px',
          }}
        >
          <Link href={articleHref} className="readMore">
            View on ETN →
          </Link>

          {sourceHref ? (
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="readMore"
            >
              Read Original ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}