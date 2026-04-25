import Head from 'next/head';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollTop from '../ui/ScrollTop';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '../../lib/seo';

interface LayoutProps {
  children:     ReactNode;
  title?:       string;
  description?: string;
  keywords?:    string;
  canonical?:   string;
  image?:       string;
  ogType?:      string;
  noIndex?:     boolean;
  jsonLd?:      object | object[];
}

export default function Layout({
  children,
  title,
  description,
  keywords,
  canonical,
  image,
  ogType   = 'website',
  noIndex  = false,
  jsonLd,
}: LayoutProps) {
  const siteTitle = title ?? SITE_NAME;
  const siteDesc  = description
    ?? 'COPTI is the national body representing principals of technical institutions across all 16 regions of Ghana — advancing TVET excellence, skills development, and Ghana\'s industrial transformation.';
  const canonicalUrl = canonical ?? SITE_URL;
  const ogImage      = image ?? `${SITE_URL}/og-default.png`;

  const defaultKeywords = 'COPTI, Conference of Principals of Technical Institutions, TVET Ghana, technical education Ghana, vocational training Ghana, CTVET, Ghana TVET Service, technical institutes Ghana, skills development Ghana';

  // Normalize JSON-LD to always be an array
  const schemas = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

  return (
    <>
      <Head>
        {/* ── Basic ── */}
        <title>{siteTitle}</title>
        <meta name="description"  content={siteDesc} />
        <meta name="keywords"     content={keywords ?? defaultKeywords} />
        <meta name="author"       content="COPTI Ghana" />
        <meta name="viewport"     content="width=device-width, initial-scale=1" />
        <meta name="theme-color"  content="#1A3A6B" />
        <meta name="robots"       content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
        <link rel="canonical"     href={canonicalUrl} />

        {/* ── Open Graph ── */}
        <meta property="og:type"        content={ogType} />
        <meta property="og:title"       content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:site_name"   content="COPTI Ghana" />
        <meta property="og:image"       content={ogImage} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"   content={siteTitle} />
        <meta property="og:locale"      content="en_GH" />

        {/* ── Twitter / X ── */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:site"        content={TWITTER_HANDLE} />
        <meta name="twitter:title"       content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image"       content={ogImage} />

        {/* ── Geo tags (Ghana) ── */}
        <meta name="geo.region"   content="GH" />
        <meta name="geo.placename" content="Ghana" />

        {/* ── Icons ── */}
        <link rel="icon"             href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Font Awesome ── */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        {/* ── JSON-LD Structured Data ── */}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
}
