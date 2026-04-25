// lib/seo.ts
// Central SEO configuration, meta helpers, and keyword sets for COPTI

export const SITE_URL   = process.env.NEXT_PUBLIC_SITE_URL || 'https://copti.org.gh';
export const SITE_NAME  = 'COPTI — Conference of Principals of Technical Institutions';
export const SITE_SHORT = 'COPTI Ghana';
export const TWITTER_HANDLE = '@coptiGhana';

// ── Core keyword sets ─────────────────────────────────────────────────────

export const CORE_KEYWORDS = [
  'COPTI', 'Conference of Principals of Technical Institutions',
  'TVET Ghana', 'Technical and Vocational Education Ghana',
  'technical institutes Ghana', 'vocational education Ghana',
  'CTVET Ghana', 'Ghana TVET Service', 'Ministry of Education Ghana',
  'technical education West Africa', 'vocational training Ghana',
  'TVET principals Ghana', 'technical schools Ghana',
  'skills development Ghana', "Ghana's industrial transformation",
  'TVET policy Ghana', 'WEL Ghana', 'work-based learning Ghana',
];

export const SCHOOLS_KEYWORDS = [
  'member schools COPTI', 'technical institutes directory Ghana',
  'government technical institutes Ghana', 'private technical schools Ghana',
  'TVET schools Ghana', 'technical colleges Ghana',
  'vocational schools Ghana', 'accredited technical institutes Ghana',
  'district assembly schools Ghana', 'municipal assembly schools Ghana',
  ...CORE_KEYWORDS,
];

export const NEWS_KEYWORDS = [
  'COPTI news', 'TVET news Ghana', 'technical education news Ghana',
  'vocational training updates Ghana', 'COPTI announcements',
  'Ghana TVET policy updates', 'technical education developments Ghana',
  ...CORE_KEYWORDS,
];

export const EVENTS_KEYWORDS = [
  'COPTI events', 'TVET conferences Ghana', 'Annual General Conference COPTI',
  'technical education workshops Ghana', 'principals conference Ghana',
  'TVET seminars Ghana', 'COPTI AGC', 'COPTI mid-year conference',
  ...CORE_KEYWORDS,
];

export const ABOUT_KEYWORDS = [
  'about COPTI', 'COPTI history', 'COPTI mission vision',
  'technical principals association Ghana', 'TVET professional body Ghana',
  'COPTI core values', 'COPTI objectives', 'Arko Dometey COPTI president',
  'COPTI founding', 'TVET advocacy Ghana',
  ...CORE_KEYWORDS,
];

export const GALLERY_KEYWORDS = [
  'COPTI gallery', 'COPTI photos', 'technical schools photos Ghana',
  'TVET events photos Ghana', 'COPTI conference photos',
  'technical education Ghana images',
  ...CORE_KEYWORDS,
];

// ── Page-level meta generators ────────────────────────────────────────────

export interface SeoMeta {
  title:       string;
  description: string;
  keywords:    string;
  canonical:   string;
  ogImage?:    string;
  ogType?:     string;
  noIndex?:    boolean;
}

export function getHomeSeo(): SeoMeta {
  return {
    title:       `${SITE_NAME} | Together for Skills, Together for Ghana`,
    description: 'COPTI is the national body representing principals of public technical institutions across all 16 regions of Ghana — advancing TVET excellence, skills development, and Ghana\'s industrial transformation through advocacy, standards, and partnerships.',
    keywords:    CORE_KEYWORDS.join(', '),
    canonical:   SITE_URL,
    ogType:      'website',
  };
}

export function getSchoolsSeo(count: number): SeoMeta {
  return {
    title:       `Member Schools Directory | ${count}+ Accredited Technical Institutes | COPTI Ghana`,
    description: `Explore ${count}+ accredited technical and vocational institutes represented under COPTI across all 16 regions of Ghana. Search by region, district type, and programmes offered.`,
    keywords:    SCHOOLS_KEYWORDS.join(', '),
    canonical:   `${SITE_URL}/schools`,
    ogType:      'website',
  };
}

export function getSchoolProfileSeo(school: {
  name: string; slug: string; region?: string; district?: string;
  shortDescription?: string; schoolType?: string; programmes?: string;
  yearEstablished?: number;
}): SeoMeta {
  const progs = school.programmes
    ? school.programmes.split('\n').slice(0, 5).map(p => p.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
    : [];

  const description = school.shortDescription
    || `${school.name} is an accredited ${school.schoolType ?? 'technical'} institution in ${school.district ?? school.region ?? 'Ghana'}, offering ${progs.slice(0,3).join(', ')} and more. A COPTI member school.`;

  const keywords = [
    school.name,
    `${school.name} Ghana`,
    `${school.name} programmes`,
    school.region ? `technical institutes ${school.region}` : '',
    school.district ? `technical schools ${school.district}` : '',
    school.schoolType ? `${school.schoolType} technical institute Ghana` : '',
    ...progs.map(p => `${p} Ghana`),
    school.yearEstablished ? `established ${school.yearEstablished}` : '',
    'COPTI member school',
    'accredited technical institute Ghana',
    'TVET Ghana',
    'vocational training Ghana',
  ].filter(Boolean).join(', ');

  return {
    title:       `${school.name} | COPTI Member School${school.region ? ` | ${school.region}` : ''}`,
    description: description.slice(0, 160),
    keywords,
    canonical:   `${SITE_URL}/schools/${school.slug}`,
    ogType:      'article',
  };
}

export function getNewsSeo(): SeoMeta {
  return {
    title:       `News & Updates | COPTI Ghana | TVET Education News`,
    description: 'Latest news, announcements, and updates from COPTI — the Conference of Principals of Technical Institutions in Ghana. Stay informed on TVET policy, school developments, and sector news.',
    keywords:    NEWS_KEYWORDS.join(', '),
    canonical:   `${SITE_URL}/news`,
    ogType:      'website',
  };
}

export function getPostSeo(post: {
  title: string; slug: string; excerpt?: string;
  publishedAt?: string; categories?: { title: string }[];
}): SeoMeta {
  return {
    title:       `${post.title} | COPTI Ghana`,
    description: post.excerpt?.slice(0, 160) || `Read the latest from COPTI Ghana: ${post.title}`,
    keywords:    [post.title, ...(post.categories?.map(c => c.title) ?? []), ...NEWS_KEYWORDS.slice(0, 8)].join(', '),
    canonical:   `${SITE_URL}/news/${post.slug}`,
    ogType:      'article',
  };
}

export function getAboutSeo(): SeoMeta {
  return {
    title:       `About COPTI | Conference of Principals of Technical Institutions Ghana`,
    description: 'Learn about COPTI — the Conference of Principals of Technical Institutions. Our history, mission to advance TVET in Ghana, core values (C-O-P-T-I), leadership, and partnerships with the Ministry of Education, CTVET, and Ghana TVET Service.',
    keywords:    ABOUT_KEYWORDS.join(', '),
    canonical:   `${SITE_URL}/about`,
    ogType:      'website',
  };
}

export function getEventsSeo(): SeoMeta {
  return {
    title:       `Events & Conferences | COPTI Ghana | TVET Programmes`,
    description: 'Upcoming COPTI events including the Annual General Conference (AGC), mid-year conference, policy dialogues, workshops, and TVET professional development programmes across Ghana.',
    keywords:    EVENTS_KEYWORDS.join(', '),
    canonical:   `${SITE_URL}/events`,
    ogType:      'website',
  };
}

export function getGallerySeo(): SeoMeta {
  return {
    title:       `Photo Gallery | COPTI Ghana | Events & Technical Schools`,
    description: 'Photos from COPTI conferences, member schools, training workshops, awards ceremonies, and student activities across Ghana\'s technical education sector.',
    keywords:    GALLERY_KEYWORDS.join(', '),
    canonical:   `${SITE_URL}/gallery`,
    ogType:      'website',
  };
}

export function getContactSeo(): SeoMeta {
  return {
    title:       `Contact COPTI | Conference of Principals of Technical Institutions Ghana`,
    description: 'Contact the COPTI Secretariat. Reach us by phone (+233 24 362 3269), WhatsApp, or email (info@copti.org.gh). Office hours Monday–Friday 8AM–5PM.',
    keywords:    ['contact COPTI', 'COPTI secretariat', 'COPTI phone number', 'COPTI email', ...CORE_KEYWORDS.slice(0, 6)].join(', '),
    canonical:   `${SITE_URL}/contact`,
    ogType:      'website',
  };
}

// ── JSON-LD Structured Data ───────────────────────────────────────────────

export function orgSchema() {
  return {
    '@context':    'https://schema.org',
    '@type':       'Organization',
    name:          'Conference of Principals of Technical Institutions (COPTI)',
    alternateName: 'COPTI Ghana',
    url:           SITE_URL,
    logo:          `${SITE_URL}/logo.png`,
    description:   'The national professional body representing principals of public technical institutions across all 16 regions of Ghana.',
    foundingDate:  '1999',
    areaServed:    'Ghana',
    contactPoint: {
      '@type':       'ContactPoint',
      telephone:     '+233-24-362-3269',
      contactType:   'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/coptiGhana',
      'https://twitter.com/coptiGhana',
    ],
    address: {
      '@type':           'PostalAddress',
      addressCountry:    'GH',
      addressLocality:   'Ghana',
    },
  };
}

export function schoolSchema(school: {
  name: string; slug: string; region?: string; district?: string;
  phone?: string; email?: string; website?: string;
  shortDescription?: string; yearEstablished?: number;
  gpsCoordinates?: string;
}) {
  let geo = {};
  if (school.gpsCoordinates) {
    const parts = school.gpsCoordinates.split(',');
    if (parts.length >= 2) {
      geo = { geo: { '@type': 'GeoCoordinates', latitude: parts[0].trim(), longitude: parts[1].trim() } };
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type':    'EducationalOrganization',
    name:       school.name,
    url:        `${SITE_URL}/schools/${school.slug}`,
    description: school.shortDescription,
    telephone:  school.phone,
    email:      school.email,
    sameAs:     school.website ? [school.website] : undefined,
    foundingDate: school.yearEstablished ? String(school.yearEstablished) : undefined,
    address: {
      '@type':           'PostalAddress',
      addressRegion:     school.region,
      addressLocality:   school.district,
      addressCountry:    'GH',
    },
    parentOrganization: {
      '@type': 'Organization',
      name:    'Conference of Principals of Technical Institutions (COPTI)',
      url:     SITE_URL,
    },
    ...geo,
  };
}

export function newsArticleSchema(post: {
  title: string; slug: string; excerpt?: string;
  publishedAt?: string; authorName?: string;
}) {
  return {
    '@context':        'https://schema.org',
    '@type':           'NewsArticle',
    headline:          post.title,
    description:       post.excerpt,
    url:               `${SITE_URL}/news/${post.slug}`,
    datePublished:     post.publishedAt,
    dateModified:      post.publishedAt,
    author: {
      '@type': 'Organization',
      name:    post.authorName || 'COPTI Ghana',
      url:     SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name:    'COPTI Ghana',
      url:     SITE_URL,
      logo:    { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, index) => ({
      '@type':   'ListItem',
      position:  index + 1,
      name:      item.name,
      item:      item.url,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       SITE_NAME,
    url:        SITE_URL,
    potentialAction: {
      '@type':       'SearchAction',
      target:        `${SITE_URL}/schools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}