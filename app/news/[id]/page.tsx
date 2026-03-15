import { Footer } from '@/components/footer';
import { NewsCard } from '@/components/news-card';
import { NewsDetail } from '@/components/news-detail';
import { TopNav } from '@/components/top-nav';
import {
  getCategories,
  getCurrentBaseUrl,
  getNews,
  getNewsById,
} from '@/lib/api';
import { normalizeLang } from '@/lib/utils';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { lang } = await searchParams;
  const currentLang = normalizeLang(lang);

  try {
    const post = await getNewsById(Number(id), currentLang);

    return {
      title: `${post.title} | ETN News`,
      description: post.short_description || 'Read the full ETN News article.',
      openGraph: {
        title: post.title,
        description: post.short_description || 'Read the full ETN News article.',
        images: post.image_url ? [post.image_url] : [],
        url: `${getCurrentBaseUrl()}/news/${post.id}?lang=${currentLang}`,
        type: 'article',
      },
      twitter: {
        card: post.image_url ? 'summary_large_image' : 'summary',
        title: post.title,
        description: post.short_description || 'Read the full ETN News article.',
        images: post.image_url ? [post.image_url] : [],
      },
    };
  } catch {
    return {
      title: 'ETN News',
      description: 'Latest ETN News updates and breaking stories.',
    };
  }
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { lang } = await searchParams;
  const currentLang = normalizeLang(lang);
  const postId = Number(id);

  const [categories, post, relatedFeed] = await Promise.all([
    getCategories(),
    getNewsById(postId, currentLang),
    getNews({ page: 1, limit: 10, lang: currentLang }),
  ]);

  const relatedPosts = (relatedFeed?.items ?? [])
    .filter((item) => item.id !== postId)
    .slice(0, 4);

  const sidebarPosts = relatedPosts.slice(0, 3);
  const bottomPosts = relatedPosts.slice(0, 4);

  return (
    <>
      <TopNav categories={categories} currentLang={currentLang} />

      <main className="pageWrap">
        <div className="container">
          <section className="etnArticlePageLayout">
            <div className="etnArticlePageMain">
              <NewsDetail post={post} lang={currentLang} />

              {bottomPosts.length > 0 ? (
                <section className="etnRelatedSection">
                  <div className="etnRelatedHeader">
                    <div>
                      <span className="etnRelatedBadge">Related Coverage</span>

                      <h2 className="etnRelatedTitle">
                        More stories from ETN
                      </h2>
                    </div>

                    <span className="etnRelatedMeta">
                      Latest curated coverage
                    </span>
                  </div>

                  <div className="newsGrid">
                    {bottomPosts.map((item, index) => (
                      <NewsCard
                        key={item.id}
                        post={item}
                        lang={currentLang}
                        priority={index < 2}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="etnArticlePageSidebar sidebarBlock">
              <div className="etnArticleSidebarCard">
                <div className="etnArticleSidebarHeader">
                  <span className="etnArticleSidebarBadge">ETN Sidebar</span>

                  <h3 className="etnArticleSidebarTitle">More on ETN</h3>

                  <p className="etnArticleSidebarText">
                    Latest stories from the ETN live feed.
                  </p>
                </div>

                {sidebarPosts.length > 0 ? (
                  <div className="sidebarList">
                    {sidebarPosts.map((item, index) => (
                      <NewsCard
                        key={item.id}
                        post={item}
                        lang={currentLang}
                        priority={index === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="etnArticleSidebarEmpty">
                    More ETN stories will appear here once additional articles
                    are available in the selected language.
                  </div>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}