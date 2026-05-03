import type { GetServerSideProps } from 'next';
import { client } from '../lib/sanity';
import { SITE_URL } from '../lib/seo';

// Fixed launch date — stops Google showing "X hours ago"
const LAUNCH_DATE = '2026-04-24';

const STATIC_PAGES = [
  { path: '',         priority: '1.0',  changefreq: 'weekly',  lastmod: LAUNCH_DATE },
  { path: '/about',   priority: '0.9',  changefreq: 'monthly', lastmod: LAUNCH_DATE },
  { path: '/schools', priority: '0.95', changefreq: 'weekly',  lastmod: LAUNCH_DATE },
  { path: '/news',    priority: '0.85', changefreq: 'daily',   lastmod: LAUNCH_DATE },
  { path: '/gallery', priority: '0.75', changefreq: 'weekly',  lastmod: LAUNCH_DATE },
  { path: '/events',  priority: '0.80', changefreq: 'weekly',  lastmod: LAUNCH_DATE },
  { path: '/contact', priority: '0.70', changefreq: 'monthly', lastmod: LAUNCH_DATE },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function url(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap(
  schools: { slug: string; _updatedAt?: string }[],
  posts:   { slug: string; publishedAt?: string }[],
  gallery: { slug: string; date?: string }[],
): string {
  const staticUrls = STATIC_PAGES.map(p =>
    url(`${SITE_URL}${p.path}`, p.lastmod, p.changefreq, p.priority)
  ).join('');

  const schoolUrls = schools.map(s =>
    url(
      `${SITE_URL}/schools/${s.slug}`,
      s._updatedAt ? s._updatedAt.split('T')[0] : LAUNCH_DATE,
      'monthly',
      '0.85',
    )
  ).join('');

  const postUrls = posts.map(p =>
    url(
      `${SITE_URL}/news/${p.slug}`,
      p.publishedAt ? p.publishedAt.split('T')[0] : LAUNCH_DATE,
      'monthly',
      '0.75',
    )
  ).join('');

  const galleryUrls = gallery.map(g =>
    url(
      `${SITE_URL}/gallery/${g.slug}`,
      g.date ?? LAUNCH_DATE,
      'monthly',
      '0.65',
    )
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticUrls}${schoolUrls}${postUrls}${galleryUrls}
</urlset>`;
}

export default function Sitemap() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [schools, posts, gallery] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt?: string }[]>(
      `*[_type == "school"] { "slug": slug.current, _updatedAt }`
    ).catch(() => []),
    client.fetch<{ slug: string; publishedAt?: string }[]>(
      `*[_type == "post"] { "slug": slug.current, publishedAt }`
    ).catch(() => []),
    client.fetch<{ slug: string; date?: string }[]>(
      `*[_type == "mediaItem"] { "slug": slug.current, date }`
    ).catch(() => []),
  ]);

  const sitemap = generateSitemap(schools, posts, gallery);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(sitemap);
  res.end();

  return { props: {} };
};
