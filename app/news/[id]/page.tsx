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
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.6fr) minmax(300px, 0.72fr)',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                minWidth: 0,
              }}
            >
              <NewsDetail post={post} lang={currentLang} />

              {bottomPosts.length > 0 ? (
                <section
                  style={{
                    marginTop: '40px',
                    paddingTop: '28px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          borderRadius: '999px',
                          background: 'rgba(220,38,38,0.12)',
                          color: '#ffb4b4',
                          fontSize: '12px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '10px',
                        }}
                      >
                        Related Coverage
                      </span>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: '1.6rem',
                          lineHeight: 1.15,
                          fontWeight: 900,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        More stories from ETN
                      </h2>
                    </div>

                    <span
                      style={{
                        color: 'rgba(255,255,255,0.58)',
                        fontSize: '0.95rem',
                      }}
                    >
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

            <aside
              className="sidebarBlock"
              style={{
                position: 'sticky',
                top: '132px',
                alignSelf: 'start',
              }}
            >
              <div
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  padding: '20px',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))',
                  boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
                }}
              >
                <div
                  style={{
                    marginBottom: '18px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 10px',
                      borderRadius: '999px',
                      background: 'rgba(220,38,38,0.10)',
                      color: '#ffb4b4',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    ETN Sidebar
                  </span>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    More on ETN
                  </h3>

                  <p
                    style={{
                      margin: '10px 0 0',
                      color: 'rgba(255,255,255,0.66)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    Fresh stories from the ETN live feed, pulled from the same
                    backend as your admin and mobile apps.
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
                  <div
                    style={{
                      borderRadius: '18px',
                      padding: '18px',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'rgba(255,255,255,0.68)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
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