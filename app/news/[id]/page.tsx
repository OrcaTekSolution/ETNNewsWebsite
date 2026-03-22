import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { NewsCard } from '@/components/news-card';
import { TopNav } from '@/components/top-nav';
import AdsenseAd from '@/components/adsense-ad';
import { getCategories, getNews } from '@/lib/api';
import { NewsPost } from '@/lib/types';
import { normalizeLang } from '@/lib/utils';

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

const TARGET_POSTS = 30;

export default async function Home({ searchParams }: PageProps) {
  const { lang } = await searchParams;
  const currentLang = normalizeLang(lang);

  const [categories, feed1] = await Promise.all([
    getCategories(),
    getNews({ page: 1, limit: 30, lang: currentLang }),
  ]);

  let posts: NewsPost[] = feed1?.items ?? [];

  if (posts.length < TARGET_POSTS) {
    const feed2 = await getNews({ page: 2, limit: 30, lang: currentLang });
    const page2Posts: NewsPost[] = feed2?.items ?? [];
    posts = mergeUniquePosts(posts, page2Posts);
  }

  if (posts.length < TARGET_POSTS) {
    const feed3 = await getNews({ page: 3, limit: 30, lang: currentLang });
    const page3Posts: NewsPost[] = feed3?.items ?? [];
    posts = mergeUniquePosts(posts, page3Posts);
  }

  posts = posts.slice(0, TARGET_POSTS);

  const heroPosts = posts.slice(0, 7);
  const remainingPosts = posts.slice(7);

  const featuredPosts = remainingPosts.slice(0, 6);
  const latestPosts = remainingPosts.slice(6, 15);
  const morePosts = remainingPosts.slice(15, 21);

  return (
    <>
      <TopNav categories={categories} currentLang={currentLang} />

      <main className="pageWrap">
        <div className="container pageContent">
          {heroPosts.length > 0 ? (
            <HeroSection posts={heroPosts} lang={currentLang} />
          ) : (
            <section
              style={{
                border: '1px solid rgba(16,32,51,0.08)',
                borderRadius: '28px',
                padding: '56px 24px',
                textAlign: 'center',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(244,248,252,0.96))',
                marginBottom: '32px',
                boxShadow: '0 10px 24px rgba(15,44,80,0.06)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  background: 'rgba(220,38,38,0.10)',
                  color: '#d62828',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}
              >
                ETN Live
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  color: '#102033',
                }}
              >
                ETN News Homepage
              </h1>

              <p
                style={{
                  margin: '14px auto 0',
                  maxWidth: '760px',
                  color: '#5b6b7f',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                }}
              >
                Your ETN website is connected directly to the same backend as
                your mobile app and admin app. When stories are published from
                the admin panel, they will automatically appear here.
              </p>
            </section>
          )}

          <div style={{ margin: '0 0 36px' }}>
            <AdsenseAd
              adSlot="YOUR_AD_SLOT_ID"
              style={{
                minHeight: '100px',
                padding: '12px 0',
              }}
            />
          </div>

          {featuredPosts.length > 0 ? (
            <section className="sectionBlock" style={{ marginBottom: '36px' }}>
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
                      background: 'rgba(15,76,129,0.08)',
                      color: '#0f4c81',
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '10px',
                    }}
                  >
                    Editor Picks
                  </span>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: '#102033',
                    }}
                  >
                    Featured Coverage
                  </h2>
                </div>

                <span
                  style={{
                    color: '#7a8da3',
                    fontSize: '0.95rem',
                  }}
                >
                  Curated from the ETN live feed
                </span>
              </div>

              <div className="newsGrid">
                {featuredPosts.map((post, index) => (
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

          <div style={{ margin: '0 0 36px' }}>
            <AdsenseAd
              adSlot="YOUR_AD_SLOT_ID"
              style={{
                minHeight: '100px',
                padding: '12px 0',
              }}
            />
          </div>

          <section className="sectionBlock">
            <div className="sectionHeader">
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(220,38,38,0.10)',
                    color: '#d62828',
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '10px',
                  }}
                >
                  Latest Updates
                </span>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: '#102033',
                  }}
                >
                  Latest ETN Stories
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  maxWidth: '760px',
                  color: '#5b6b7f',
                  lineHeight: 1.75,
                }}
              >
                Every story here comes directly from your ETN backend, so
                anything posted in the admin app is reflected on the website
                automatically.
              </p>
            </div>

            {latestPosts.length > 0 ? (
              <div className="newsGrid">
                {latestPosts.map((post, index) => (
                  <NewsCard
                    key={post.id}
                    post={post}
                    lang={currentLang}
                    priority={index < 3}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  border: '1px solid rgba(16,32,51,0.08)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(244,248,252,0.96))',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#102033',
                  }}
                >
                  No latest stories yet
                </h3>
                <p
                  style={{
                    margin: '10px auto 0',
                    maxWidth: '700px',
                    color: '#5b6b7f',
                    lineHeight: 1.75,
                  }}
                >
                  Once articles are published from the ETN admin app, they will
                  start appearing here automatically.
                </p>
              </div>
            )}
          </section>

          <div style={{ margin: '36px 0 0' }}>
            <AdsenseAd
              adSlot="YOUR_AD_SLOT_ID"
              style={{
                minHeight: '100px',
                padding: '12px 0',
              }}
            />
          </div>

          {morePosts.length > 0 ? (
            <section className="sectionBlock" style={{ marginTop: '36px' }}>
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
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#102033',
                  }}
                >
                  More from ETN
                </h2>

                <span
                  style={{
                    color: '#7a8da3',
                    fontSize: '0.94rem',
                  }}
                >
                  Real-time website sync enabled
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
        </div>
      </main>

      <Footer />
    </>
  );
}

function mergeUniquePosts(existing: NewsPost[], incoming: NewsPost[]): NewsPost[] {
  const seen = new Set(existing.map((post) => post.id));
  const merged = [...existing];

  for (const post of incoming) {
    if (!seen.has(post.id)) {
      seen.add(post.id);
      merged.push(post);
    }
  }

  return merged;
}