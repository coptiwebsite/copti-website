import type { GetServerSideProps } from 'next';
import { SITE_URL } from '../lib/seo';

export default function Robots() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = `# COPTI Ghana — robots.txt
User-agent: *
Allow: /

# Block studio and API routes from indexing
Disallow: /api/
Disallow: /studio/
Disallow: /_next/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(content);
  res.end();

  return { props: {} };
};