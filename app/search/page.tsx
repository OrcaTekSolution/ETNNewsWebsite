import { Footer } from '@/components/footer';
import { NewsCard } from '@/components/news-card';
import { TopNav } from '@/components/top-nav';
import { getCategories, getNews } from '@/lib/api';
import { normalizeLang } from '@/lib/utils';

type PageProps = {
  searchParams: Promise<{ q?: string; lang?: string }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, lang } = await searchParams;
  const currentLang = normalizeLang(lang);
  const query = q?.trim() || '';

  const [categories, feed] = await Promise.all([
    getCategories(),
    getNews({ q: query, page: 1, limit: 24, lang: currentLang }),
  ]);

  const posts = feed?.items ?? [];

  return (
    <>
      <TopNav categories={categories} currentLang={currentLang} />

      <main className="pageWrap">
        <div className="container pageContent">
          <section className="sectionBlock">
            <div
              style={{
                marginBottom: '28px',
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
                  background: 'rgba(220,38,38,0.10)',
                  color: '#ffb4b4',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                ETN Search
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: 1.05,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}
              >
                Search Results
              </h1>

              <p
                style={{
                  marginTop: '14px',
                  marginBottom: 0,
                  maxWidth: '840px',
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                }}
              >
                {query
                  ? `Showing ETN stories matching “${query}”. All results are pulled live from your ETN backend, so any article published through the admin app can be found here as well.`
                  : 'Use the ETN search bar to find breaking stories, headlines, and topic-based coverage from your live backend feed.'}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginTop: '18px',
                }}
              >
                {query ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 14px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                    }}
                  >
                    Query: {query}
                  </span>
                ) : null}

                <span
                  style={{
                    color: 'rgba(255,255,255,0.58)',
                    fontSize: '0.95rem',
                  }}
                >
                  {posts.length} result{posts.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            {!query ? (
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
                    fontSize: '1.55rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Start searching ETN News
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
                  Search for politics, business, sports, cinema, world news, or
                  any keyword from your ETN live feed.
                </p>
              </div>
            ) : posts.length === 0 ? (
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
                    fontSize: '1.55rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  No matching stories found
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
                  We couldn’t find any ETN stories for “{query}” in the selected
                  language right now. Try another keyword or check back after new
                  stories are published from the admin app.
                </p>
              </div>
            ) : (
              <>
                <section style={{ marginBottom: '18px' }}>
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
                          color: 'rgba(255,255,255,0.74)',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '10px',
                        }}
                      >
                        Matching Stories
                      </span>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: '1.45rem',
                          fontWeight: 900,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        Results for “{query}”
                      </h2>
                    </div>

                    <span
                      style={{
                        color: 'rgba(255,255,255,0.56)',
                        fontSize: '0.94rem',
                      }}
                    >
                      Live ETN backend results
                    </span>
                  </div>

                  <div className="newsGrid">
                    {posts.map((post, index) => (
                      <NewsCard
                        key={post.id}
                        post={post}
                        lang={currentLang}
                        priority={index < 3}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}