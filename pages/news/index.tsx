// pages/news/index.tsx
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
// (SEO imports removed)
import { client, POSTS_QUERY, urlFor } from '../../lib/sanity';
import type { NewsPageProps, PostCard } from '../../types';

export default function NewsPage({ posts }: NewsPageProps) {  // ← added
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
          {posts.length > 0 ? (
            <div className="newsGrid">
              {posts.map(post => (
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
                    <p>{post.excerpt?.split(' ').slice(0,20).join(' ')}{(post.excerpt?.split(' ').length ?? 0) > 20 ? '…' : ''}</p>
                  </div>
                  <div className="newsCardFooter">
                    <Link href={`/news/${post.slug.current}`} className="btn btn-outline btn-sm">Read More →</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="noResults">
              <h3>No articles yet</h3>
              <p>News and updates will appear here soon.</p>
              <Link href="/" className="btn btn-primary">Go to Homepage</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}  // ← this closing brace now belongs to the function

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const posts = await client.fetch<PostCard[]>(POSTS_QUERY).catch(() => []);
  return { props: { posts: posts ?? [] }, revalidate: 300 };
};