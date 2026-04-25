import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { client, GALLERY_QUERY, urlFor } from '../../lib/sanity';

interface GalleryItem {
  _id:         string;
  title:       string;
  slug:        { current: string };
  category?:   string;
  coverImage?: any;
  date?:       string;
  description?: string;
  imageCount?: number;
  isFeatured?: boolean;
}

interface GalleryPageProps { items: GalleryItem[]; }

const CATEGORIES = [
  'All', 'Events & Conferences', 'Member Schools',
  'Training & Workshops', 'Awards & Recognition',
  'Student Activities', 'General',
];

export default function GalleryPage({ items }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <Layout
      title="Gallery - COPTI Ghana"
      description="Photos from COPTI events, conferences, member schools, and training programmes across Ghana."
    >
      {/* HERO */}
      <div className="pageHero" style={{position:'relative', background: 'var(--navy)', minHeight: 260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (5).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <span className="current">Gallery</span>
          </nav>
          <h1>Photo Gallery</h1>
          <p>Photos from COPTI events, conferences, member schools, and training programmes across Ghana.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* CATEGORY FILTER */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 18px',
                borderRadius: 24,
                border: '2px solid',
                borderColor: activeCategory === cat ? 'var(--navy)' : 'var(--light-grey)',
                background: activeCategory === cat ? 'var(--navy)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--charcoal)',
                fontFamily: 'var(--font-btn)',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          {filtered.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {filtered.map(item => (
                <Link key={item._id} href={`/gallery/${item.slug.current}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.22s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(26,58,107,0.14)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
                  }}>

                    {/* Cover image */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--navy)' }}>
                      {item.coverImage ? (
                        <Image
                          src={urlFor(item.coverImage).width(600).height(375).url()}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
                            <rect x="4" y="8" width="40" height="32" rx="3" stroke="white" strokeWidth="2"/>
                            <circle cx="16" cy="20" r="4" stroke="white" strokeWidth="2"/>
                            <path d="M4 34l10-10 8 8 6-6 16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                      {/* Photo count badge */}
                      {(item.imageCount ?? 0) > 0 && (
                        <div style={{
                          position: 'absolute', bottom: 10, right: 10,
                          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                          color: 'white', padding: '4px 10px', borderRadius: 20,
                          fontSize: 12, fontFamily: 'var(--font-btn)', fontWeight: 700,
                          display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="white" strokeWidth="1.2"/>
                            <circle cx="4" cy="5.5" r="1.2" stroke="white" strokeWidth="1"/>
                            <path d="M1 8l2.5-2.5 2 2 1.5-1.5 3 3" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                          </svg>
                          {(item.imageCount ?? 0) + 1} photos
                        </div>
                      )}
                      {/* Category badge */}
                      {item.category && (
                        <div style={{
                          position: 'absolute', top: 10, left: 10,
                          background: 'var(--gold)', color: 'white',
                          padding: '3px 10px', borderRadius: 20,
                          fontSize: 11, fontFamily: 'var(--font-btn)', fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                        }}>
                          {item.category}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '16px 18px 18px' }}>
                      <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', color: 'var(--navy)', marginBottom: 6, lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      {item.date && (
                        <p style={{ fontSize: 13, color: 'var(--grey)', margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                          <i className="fa fa-calendar" style={{ fontSize: 11, color: 'var(--gold)' }} />
                          {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="noResults">
              <h3>No photos in this category yet</h3>
              <p>Check back soon for updates.</p>
              <button className="btn btn-primary" onClick={() => setActiveCategory('All')}>View All</button>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  const items = await client.fetch<GalleryItem[]>(GALLERY_QUERY).catch(() => []);
  return { props: { items: items ?? [] }, revalidate: 300 };
};