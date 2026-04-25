import { useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { client, GALLERY_ITEM_QUERY, GALLERY_QUERY, urlFor } from '../../lib/sanity';

interface GalleryImage { _key?: string; alt?: string; url?: string; asset?: any; }
interface GalleryAlbum {
  _id: string; title: string; slug: { current: string };
  category?: string; coverImage?: any; date?: string;
  description?: string; images?: GalleryImage[];
}
interface Props { album: GalleryAlbum; }

export default function GalleryAlbum({ album }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!album) return (
    <Layout title="Album Not Found - COPTI Ghana" description="The photo album you are looking for cannot be found. It may have been removed.">
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h3>Album not found</h3>
        <Link href="/gallery" className="btn btn-primary">Back to Gallery</Link>
      </div>
    </Layout>
  );

  const { title, category, coverImage, date, description, images } = album;

  // All photos: cover + gallery images
  const allPhotos = [
    ...(coverImage ? [{ src: urlFor(coverImage).width(1200).height(800).url(), alt: title }] : []),
    ...(images ?? []).map(img => ({
      src: img.url || (img.asset ? urlFor(img).width(1200).height(800).url() : ''),
      alt: img.alt || title,
    })),
  ].filter(p => p.src);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % allPhotos.length : null);

  return (
    <Layout title={title} description={description ?? `${title} — COPTI Gallery`}>

      {/* HERO SECTION: visually unified blue overlay with album cover */}
      <div className="pageHero" style={{position:'relative', background:'var(--navy)', minHeight:260, display:'flex', alignItems:'center'}}>
        {coverImage ? (
          <Image
            src={urlFor(coverImage).width(1200).height(500).url()}
            alt={title}
            fill
            sizes="100vw"
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}}
            priority
          />
        ) : (
          <img src="/hero/hero (6).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        )}
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <Link href="/gallery">Gallery</Link> <span>/</span>
            <span className="current">{title}</span>
          </nav>
          <div style={{ marginTop:12 }}>
            {category && <span className="badge badge-category" style={{ marginRight:10 }}>{category}</span>}
            {date && (
              <span style={{ color:'rgba(255,255,255,0.6)', fontSize:13 }}>
                <i className="fa fa-calendar" style={{ marginRight: 6, color: 'var(--gold)' }} />
                {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginLeft: 10 }}>
              {allPhotos.length} photo{allPhotos.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h1 style={{ marginTop:12 }}>{title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">

          <Link href="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--navy)', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-btn)', textDecoration: 'none', marginBottom: 28 }}>
            <i className="fa fa-arrow-left" style={{ fontSize: 11 }} /> Back to Gallery
          </Link>

          {description && (
            <p style={{ fontSize: '1.05rem', color: 'var(--grey)', maxWidth: 700, marginBottom: 36, lineHeight: 1.75 }}>
              {description}
            </p>
          )}

          {/* PHOTO GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 14,
          }}>
            {allPhotos.map((photo, i) => (
              <div key={i}
                onClick={() => setLightbox(i)}
                style={{
                  borderRadius: 10, overflow: 'hidden',
                  aspectRatio: i === 0 ? '16/9' : '4/3',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  cursor: 'zoom-in', position: 'relative',
                  background: 'var(--light-bg)',
                }}
              >
                <Image
                  src={photo.src} alt={photo.alt}
                  fill sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                />
                {/* Zoom hint */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.15)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0)'}>
                  <i className="fa fa-expand" style={{ color: 'white', fontSize: 20, opacity: 0, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'} />
                </div>
                {/* Caption */}
                {photo.alt && photo.alt !== title && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '20px 12px 10px', color: 'white', fontSize: 12 }}>
                    {photo.alt}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/* Close */}
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 20, right: 24,
            background: 'none', border: 'none', color: 'white',
            fontSize: 28, cursor: 'pointer', lineHeight: 1, zIndex: 2,
          }}>✕</button>

          {/* Counter */}
          <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'var(--font-btn)' }}>
            {lightbox + 1} / {allPhotos.length}
          </div>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '82vh', position: 'relative' }}>
            <img
              src={allPhotos[lightbox].src}
              alt={allPhotos[lightbox].alt}
              style={{ maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: 6 }}
            />
            {allPhotos[lightbox].alt && allPhotos[lightbox].alt !== title && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 10 }}>
                {allPhotos[lightbox].alt}
              </p>
            )}
          </div>

          {/* Arrows */}
          {allPhotos.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev(); }} style={{
                position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>‹</button>
              <button onClick={e => { e.stopPropagation(); next(); }} style={{
                position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>›</button>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await client.fetch<{ slug: { current: string } }[]>(`*[_type == "mediaItem"]{ slug }`).catch(() => []);
  return {
    paths: (items ?? []).map(i => ({ params: { slug: i.slug.current } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const album = await client.fetch<GalleryAlbum>(GALLERY_ITEM_QUERY, { slug: params?.slug as string }).catch(() => null);
  if (!album) return { notFound: true };
  return { props: { album }, revalidate: 300 };
};