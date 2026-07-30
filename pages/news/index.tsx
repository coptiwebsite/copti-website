// pages/news/index.tsx
import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
// (SEO imports removed)
import { client, POSTS_QUERY, CATEGORIES_QUERY, urlFor } from '../../lib/sanity';
import type { NewsPageProps, PostCard, PostCategory, PostSchoolRef } from '../../types';

const formatExcerpt = (text?: string, maxWords = 40) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  return words.slice(0, maxWords).join(' ');
};

const hasMoreWords = (text?: string, maxWords = 40) => {
  if (!text) return false;
  return text.trim().split(/\s+/).length > maxWords;
};

export default function NewsPage({ posts, categories, schools }: NewsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSchool, setActiveSchool]     = useState<string | null>(null);

  const filteredPosts = posts.filter(p => {
    const categoryMatch = !activeCategory || p.categories?.some(c => c.title === activeCategory);
    const schoolMatch   = !activeSchool   || p.relatedSchool?._id === activeSchool;
    return categoryMatch && schoolMatch;
  });

  const resetAll = () => { setActiveCategory(null); setActiveSchool(null); };

  return (
    <Layout>
      <div className="pageHero" style={{position:'relative', background: 'var(--navy)', minHeight: 260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (6).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <span className="current">News &amp; Blog</span>
          </nav>
          <h1>News &amp; Updates</h1>
          <p>Stay informed on COPTI activities, technical education news, and sector developments.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {(categories.length > 0 || schools.length > 0) && (
            <div className="newsFilters">
              {categories.length > 0 && (
                <div className="newsFilterBar">
                  <button
                    className={`newsFilterBtn${activeCategory === null ? ' newsFilterBtn--active' : ''}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    All Categories
                  </button>
                  {categories.map((cat: PostCategory) => (
                    <button
                      key={cat.slug?.current ?? cat.title}
                      className={`newsFilterBtn${activeCategory === cat.title ? ' newsFilterBtn--active' : ''}`}
                      onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              )}
              {schools.length > 0 && (
                <div className="newsFilterSchool">
                  <select
                    className="newsSchoolSelect"
                    value={activeSchool ?? ''}
                    onChange={e => setActiveSchool(e.target.value || null)}
                    aria-label="Filter by school"
                  >
                    <option value="">All Schools</option>
                    {schools.map((s: PostSchoolRef) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          {filteredPosts.length > 0 ? (
            <div className="newsGrid">
              {filteredPosts.map(post => (
                <article key={post._id} className="newsCard">
                  <div className="newsCardImage">
                    {post.mainImage ? (
                      <Link href={`/news/${post.slug.current}`}>
                        <Image
                          src={urlFor(post.mainImage).width(600).height(340).url()}
                          alt={post.title}
                          width={600} height={340}
                          style={{ width:'100%', height:'100%', objectFit:'cover' }}
                        />
                      </Link>
                    ) : (
                      <div style={{ width:'100%',height:'100%',background:'linear-gradient(135deg,var(--navy),#2a5aa8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48 }}>📰</div>
                    )}
                  </div>
                  <div className="newsCardBody">
                    <div className="newsCardMeta">
                      {post.categories?.[0] && <span className="badge badge-category">{post.categories[0].title}</span>}
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span>
                    </div>
                    <h3><Link href={`/news/${post.slug.current}`}>{post.title}</Link></h3>
                    <p>{formatExcerpt(post.excerpt, 28)}{hasMoreWords(post.excerpt, 28) ? '…' : ''}</p>
                  </div>
                  <div className="newsCardFooter">
                    <Link href={`/news/${post.slug.current}`} className="btn btn-outline btn-sm">Read More →</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="noResults">
              <h3>{(activeCategory || activeSchool) ? 'No matching articles' : 'No articles yet'}</h3>
              <p>{(activeCategory || activeSchool) ? 'Try adjusting your filters.' : 'News and updates will appear here soon.'}</p>
              {(activeCategory || activeSchool)
                ? <button className="btn btn-primary" onClick={resetAll}>Clear Filters</button>
                : <Link href="/" className="btn btn-primary">Go to Homepage</Link>
              }
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}  // ← this closing brace now belongs to the function

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const [posts, categories] = await Promise.all([
    client.fetch<PostCard[]>(POSTS_QUERY).catch(() => []),
    client.fetch<PostCategory[]>(CATEGORIES_QUERY).catch(() => []),
  ]);

  // Derive unique schools from posts that have a relatedSchool tagged
  const schoolMap = new Map<string, PostSchoolRef>();
  for (const p of (posts ?? [])) {
    if (p.relatedSchool) schoolMap.set(p.relatedSchool._id, p.relatedSchool);
  }
  const schools = Array.from(schoolMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return { props: { posts: posts ?? [], categories: categories ?? [], schools }, revalidate: 300 };
};