import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Layout from '../../components/layout/Layout';
import { client, POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, urlFor } from '../../lib/sanity';
import { getPostSeo, newsArticleSchema, orgSchema, breadcrumbSchema, SITE_URL } from '../../lib/seo';
import type { PostPageProps, Post } from '../../types';

export default function SinglePost({ post }: PostPageProps) {
  if (!post) return (
    <Layout title="Post Not Found">
      <div className="noResults" style={{ padding:'100px 20px' }}>
        <h3>Post not found</h3>
        <Link href="/news" className="btn btn-primary">Back to News</Link>
      </div>
    </Layout>
  );

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const slugStr = typeof post.slug === 'string' ? post.slug : post.slug?.current ?? '';
  const getExcerptText = (excerpt: any) => {
    if (!excerpt) return '';
    if (typeof excerpt === 'string') return excerpt;
    const blocks = Array.isArray(excerpt) ? excerpt : [excerpt];
    return blocks
      .map((block: any) => block.children?.map?.((child: any) => child.text).join('') ?? '')
      .join(' ');
  };
  const seo     = getPostSeo({
    title:       post.title,
    slug:        slugStr,
    excerpt:     getExcerptText(post.excerpt),
    publishedAt: post.publishedAt,
    categories:  post.categories,
  });


  return (
    <Layout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonical={seo.canonical}
      ogType="article"
      image={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
      jsonLd={[
        newsArticleSchema({
          title:       post.title,
          slug:        slugStr,
          excerpt:     getExcerptText(post.excerpt),
          publishedAt: post.publishedAt,
          authorName:  post.author?.name,
        }),
        orgSchema(),
        breadcrumbSchema([
          { name: 'Home',          url: SITE_URL },
          { name: 'News',          url: `${SITE_URL}/news` },
          { name: post.title,      url: `${SITE_URL}/news/${slugStr}` },
        ]),
      ]}
    >
      {/* HERO SECTION: visually unified blue overlay */}
      <div className="pageHero" style={{position:'relative', background:'var(--navy)', minHeight:260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (6).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <Link href="/news">News</Link> <span>/</span>
            <span className="current">{post.title}</span>
          </nav>
          <div style={{ marginTop:12 }}>
            {post.categories?.[0] && <span className="badge badge-category" style={{ marginRight:10 }}>{post.categories[0].title}</span>}
            <span style={{ color:'rgba(255,255,255,0.6)', fontSize:13 }}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
            </span>
          </div>
          <h1 style={{ marginTop:12 }}>{post.title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth:820 }}>
          {post.mainImage && (
            <div style={{ borderRadius:'var(--radius)',overflow:'hidden',marginBottom:36,boxShadow:'var(--shadow)' }}>
              <Image
                src={urlFor(post.mainImage).width(820).height(460).url()}
                alt={post.title}
                width={820} height={460}
                style={{ width:'100%', height:'auto' }}
              />
            </div>
          )}

          {post.author && (
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:32,paddingBottom:24,borderBottom:'1px solid var(--light-grey)' }}>
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={post.author.name}
                  width={40} height={40}
                  style={{ borderRadius:'50%' }}
                />
              )}
              <div>
                <p style={{ fontWeight:700, color:'var(--navy)', margin:0 }}>{post.author.name}</p>
                {post.author.bio && (
                  <p style={{ fontSize:13, color:'var(--grey)', margin:0 }}>
                    {typeof post.author.bio === 'string'
                      ? post.author.bio
                      : (Array.isArray(post.author.bio) ? post.author.bio : [post.author.bio])
                         .map((block: any) => block.children?.map?.((c: any) => c.text).join('') ?? '').join(' ')
                    }
                  </p>
                )}
              </div>
            </div>
          )}

          {post.body && (
            <div className="portableText">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div style={{ margin:'28px 0', borderRadius:'var(--radius)', overflow:'hidden' }}>
                        <Image
                          src={urlFor(value).width(820).url()}
                          alt={(value as { alt?: string }).alt ?? ''}
                          width={820} height={460}
                          style={{ width:'100%', height:'auto' }}
                        />
                      </div>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* Share */}
          <div style={{ marginTop:40, padding:24, background:'var(--light-bg)', borderRadius:'var(--radius)' }}>
            <p style={{ fontWeight:700, color:'var(--navy)', marginBottom:12 }}>Share this article:</p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {([
                ['fab fa-facebook-f', '#4267B2', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, 'Facebook'],
                ['fab fa-whatsapp',   '#25D366', `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + pageUrl)}`, 'WhatsApp'],
                ['fab fa-x-twitter',  '#000',    `https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`, 'X'],
              ] as [string, string, string, string][]).map(([icon, bg, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="btn btn-sm" style={{ background:bg, color:'white' }}>
                  <i className={icon} /> {label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ marginTop:30 }}>
            <Link href="/news" className="backLink"><i className="fa fa-arrow-left" /> Back to News</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY).catch(() => []);
  return { paths: (slugs ?? []).map(s => ({ params: { slug: s.slug } })), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const post = await client.fetch<Post>(POST_BY_SLUG_QUERY, { slug: params?.slug as string }).catch(() => null);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 300 };
};