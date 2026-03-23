import { Footer } from '@/components/footer';
import { NewsCard } from '@/components/news-card';
import { TopNav } from '@/components/top-nav';
import AdsenseAd from '@/components/adsense-ad';
import { getCategories, getNews } from '@/lib/api';
import { normalizeLang } from '@/lib/utils';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
};

const CATEGORY_TOP_SLOT = '2057414861';
const CATEGORY_MID_SLOT = '1310742150';

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { lang } = await searchParams;

  const currentLang = normalizeLang(lang);
  const categoryId = Number(id);

  const [categories, feed] = await Promise.all([
    getCategories(),
    getNews({
      categoryId,
      page: 1,
      limit: 18,
      lang: currentLang,
    }),
  ]);

  const currentCategory = categories.find((item) => item.id === categoryId);

  const posts = feed?.items ?? [];
  const leadPost = posts[0];
  const highlightPosts = posts.slice(1, 3);
  const latestPosts = posts.slice(3, 9);
  const morePosts = posts.slice(9, 18);

  return (
    <>
      <TopNav categories={categories} currentLang={currentLang} />

      <main className="pageWrap">
        <div className="container pageContent">
          <section className="sectionBlock">
            <div
              style={{
                marginBottom: '32px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  background: 'rgba(220, 38, 38, 0.12)',
                  color: '#ffb4b4',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                ETN Section
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.02,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}
              >
                {currentCategory?.name || 'Category News'}
              </h1>

              <p
                style={{
                  marginTop: '14px',
                  marginBottom: 0,
                  maxWidth: '900px',
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                }}
              >
                Live updates, top headlines, and image-led coverage from{' '}
                <strong>{currentCategory?.name || 'this section'}</strong>. Every
                article shown here is fetched directly from the same ETN backend
                used by your ETN mobile app and admin app, so content published
                in the admin panel automatically appears on the website.
              </p>
            </div>

            <div style={{ margin: '0 0 32px' }}>
              <AdsenseAd
                adSlot={CATEGORY_TOP_SLOT}
                style={{
                  minHeight: '100px',
                  padding: '12px 0',
                }}
              />
            </div>

            {posts.length === 0 ? (
              <div
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '28px',
                  padding: '52px 24px',
                  textAlign: 'center',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  No stories available right now
                </h2>

                <p
                  style={{
                    marginTop: '12px',
                    marginBottom: 0,
                    maxWidth: '720px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'rgba(255,255,255,0.68)',
                    lineHeight: 1.75,
                  }}
                >
                  There are no published articles in this category for the
                  selected language at the moment. Once a story is posted from
                  the ETN admin app, it will appear here automatically.
                </p>
              </div>
            ) : (
              <>
                <section
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.55fr) minmax(320px, 0.85fr)',
                    gap: '24px',
                    marginBottom: '36px',
                    alignItems: 'stretch',
                  }}
                >
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '28px',
                      padding: '18px',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.20)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          fontSize: '1.05rem',
                          fontWeight: 900,
                          letterSpacing: '0.01em',
                        }}
                      >
                        Top Story
                      </h2>

                      <span
                        style={{
                          color: '#ffb4b4',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        Featured
                      </span>
                    </div>

                    {leadPost ? (
                      <NewsCard post={leadPost} lang={currentLang} priority />
                    ) : null}
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gap: '18px',
                    }}
                  >
                    <div
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '28px',
                        padding: '18px',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          marginBottom: '16px',
                          fontSize: '1.02rem',
                          fontWeight: 900,
                        }}
                      >
                        Highlights
                      </h2>

                      <div
                        style={{
                          display: 'grid',
                          gap: '18px',
                        }}
                      >
                        {highlightPosts.map((post, index) => (
                          <NewsCard
                            key={post.id}
                            post={post}
                            lang={currentLang}
                            priority={index === 0}
                          />
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '28px',
                        padding: '20px',
                        background:
                          'linear-gradient(180deg, rgba(220,38,38,0.08), rgba(255,255,255,0.015))',
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          marginBottom: '10px',
                          fontSize: '0.95rem',
                          fontWeight: 900,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#ffb4b4',
                        }}
                      >
                        Live ETN Feed
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: 'rgba(255,255,255,0.70)',
                          lineHeight: 1.75,
                          fontSize: '0.96rem',
                        }}
                      >
                        This section stays synced with your ETN backend. Publish
                        once from the admin app and the same story becomes
                        available on the website automatically.
                      </p>
                    </div>
                  </div>
                </section>

                <div style={{ margin: '0 0 34px' }}>
                  <AdsenseAd
                    adSlot={CATEGORY_MID_SLOT}
                    style={{
                      minHeight: '100px',
                      padding: '12px 0',
                    }}
                  />
                </div>

                <section style={{ marginBottom: '34px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap',
                      marginBottom: '18px',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          borderRadius: '999px',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.72)',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '10px',
                        }}
                      >
                        Latest Coverage
                      </span>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: '1.45rem',
                          fontWeight: 900,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        Latest in {currentCategory?.name || 'this category'}
                      </h2>
                    </div>

                    <span
                      style={{
                        color: 'rgba(255,255,255,0.58)',
                        fontSize: '0.95rem',
                      }}
                    >
                      {posts.length} stor{posts.length === 1 ? 'y' : 'ies'}
                    </span>
                  </div>

                  <div className="newsGrid">
                    {(latestPosts.length > 0 ? latestPosts : highlightPosts).map(
                      (post, index) => (
                        <NewsCard
                          key={post.id}
                          post={post}
                          lang={currentLang}
                          priority={index < 2}
                        />
                      )
                    )}
                  </div>
                </section>

                {morePosts.length > 0 ? (
                  <section>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        flexWrap: 'wrap',
                        marginBottom: '18px',
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          fontSize: '1.35rem',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        More from {currentCategory?.name || 'ETN'}
                      </h2>

                      <span
                        style={{
                          color: 'rgba(255,255,255,0.56)',
                          fontSize: '0.94rem',
                        }}
                      >
                        Updated from ETN admin feed
                      </span>
                    </div>

                    <div className="newsGrid">
                      {morePosts.map((post, index) => (
                        <NewsCard
                          key={post.id}
                          post={post}
                          lang={currentLang}
                          priority={index < 2}
                        />
                      ))}
                    </div>
                  </section>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}