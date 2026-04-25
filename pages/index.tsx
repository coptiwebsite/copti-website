// Map icon for regions (matches about page stats bar)
const IconMap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--gold)" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" stroke="var(--gold)" strokeWidth="1.8"/>
  </svg>
);
import { useState, useEffect, useCallback } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import SchoolCard from '../components/schools/SchoolCard';
import {
  client, FEATURED_SCHOOLS_QUERY, LATEST_POSTS_QUERY,
  SETTINGS_QUERY, SCHOOLS_QUERY, FEATURED_EVENTS_QUERY, urlFor,
} from '../lib/sanity';
import {
  getHomeSeo, orgSchema, websiteSchema,
} from '../lib/seo';
import type { HomePageProps, SchoolCard as SchoolCardType, PostCard, SiteSettings, Event } from '../types';

// Gold icons for stats (from about page)
const IconBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 72 72" fill="none">
    <rect x="8" y="28" width="56" height="38" rx="3" stroke="var(--gold)" strokeWidth="2.2"/>
    <path d="M8 40h56" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M28 66V52h16v14" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M2 30L36 8l34 22" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="round"/>
    <circle cx="36" cy="19" r="3" stroke="var(--gold)" strokeWidth="2"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="var(--gold)" strokeWidth="1.8"/>
    <path d="M3 10h18" stroke="var(--gold)" strokeWidth="1.8"/>
    <path d="M8 3v4M16 3v4" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="7" y="13" width="3" height="3" rx="1" fill="var(--gold)"/>
    <rect x="14" y="13" width="3" height="3" rx="1" fill="var(--gold)"/>
  </svg>
);
const IconUserGroup = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="3.5" stroke="var(--gold)" strokeWidth="1.8"/>
    <circle cx="16" cy="8" r="3.5" stroke="var(--gold)" strokeWidth="1.8"/>
    <path d="M1 21c0-3.5 3-6 7-6h8c4 0 7 2.5 7 6" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconWhoWeAre = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M4 24c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="22" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M25 20.5c1.5 1 2.5 2.7 2.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 20.5C1.5 21.5.5 23.2.5 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconMission = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="14" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2.5"/>
    <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="14" y1="22" x2="14" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IconVision = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <path d="M2 14C5.5 8 9.5 5 14 5s8.5 3 12 9c-3.5 6-7.5 9-12 9s-8.5-3-12-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M14 2v3M14 23v3M2 14H5M23 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconAdvocacy = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <path d="M4 10h16l4-5H4v5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    <path d="M4 10v10l3-3h13l4 5V10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    <path d="M9 15h10M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconStandards = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconTraining = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <path d="M14 4L2 9.5l12 5.5 12-5.5L14 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    <path d="M2 9.5V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M7 12v7c0 2 3 4 7 4s7-2 7-4v-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

const IconNetworking = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.7"/>
    <circle cx="5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="23" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="23" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="7" y1="8.5" x2="12" y2="12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="21" y1="8.5" x2="16" y2="12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="7" y1="19.5" x2="12" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="21" y1="19.5" x2="16" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconMembership = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L3 5.5v8C3 18 6.5 21 11 22c4.5-1 8-4 8-8.5v-8L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 11.5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Hero Slider ─────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    img: '/hero/hero (1).JPG',
    headline: <>Driving Ghana&apos;s Industrial<br /><em>Transformation Through TVET</em></>,
    sub: 'The Conference of Principals of Technical Institutions unites principals, industry leaders, and TVET stakeholders to shape vocational excellence across all 16 regions of Ghana.',
  },
  {
    img: '/hero/hero (2).JPG',
    headline: <>Building Ghana&apos;s Technical<br /><em>Workforce of Tomorrow</em></>,
    sub: 'Advocating for policy reform, setting standards, and facilitating skills transfer to keep every technical institution competitive and nationally relevant.',
  },
  {
    img: '/hero/hero (3).JPG',
    headline: <>Together for Skills<br /><em>Together for Ghana</em></>,
    sub: "Over 60 member schools, 16 regions, and a shared mandate — to produce graduates who drive Africa's industrial future.",
  },
  {
    img: '/hero/hero (4).JPG',
    headline: <>Excellence in TVET<br /><em>Across Ghana</em></>,
    sub: 'Empowering technical institutions to deliver world-class vocational education and training for national development.',
  },
  {
    img: '/hero/hero (5).JPG',
    headline: <>Innovation &amp; Skills<br /><em>For the Future</em></>,
    sub: 'Fostering innovation and practical skills to meet the demands of a changing workforce.',
  },
  {
    img: '/hero/hero (6).JPG',
    headline: <>Leadership in TVET<br /><em>Transforming Lives</em></>,
    sub: 'Leading the way in technical and vocational education for sustainable growth and opportunity.',
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = HERO_SLIDES[current];

  return (
    <section style={{ position: 'relative', minHeight: '92vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {HERO_SLIDES.map((slideObj, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 0, transition: 'opacity 0.8s ease', opacity: i === current ? 1 : 0 }}>
          <Image
            src={slideObj.img}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
            priority={i === 0}
          />
          <div style={{ position: 'absolute', inset: 0, background: '#0a1f40', opacity: 0.55 }} />
        </div>
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 720, transition: 'opacity 0.4s ease', opacity: fading ? 0 : 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,149,42,0.15)', border: '1px solid rgba(201,149,42,0.3)', padding: '5px 14px', borderRadius: 20, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, background: 'var(--gold)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase' }} className="font-btn">
              Together for Skills — Together for Ghana
            </span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.2rem,5vw,3.4rem)', lineHeight: 1.12, marginBottom: 20 }}>{slide.headline}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: 36, maxWidth: 600 }}>{slide.sub}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/about" className="btn btn-primary btn-lg">Learn About Us</Link>
            <Link href="/schools" className="btn btn-secondary btn-lg">View Member Schools</Link>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0 }} />
        ))}
      </div>

      {[
        { side: 'left',  onClick: () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), label: 'Previous', path: 'M10 5L4 10l6 5' },
        { side: 'right', onClick: () => goTo((current + 1) % HERO_SLIDES.length), label: 'Next', path: 'M4 5l6 5-6 5' },
      ].map(({ side, onClick, label, path }) => (
        <button key={side} onClick={onClick} aria-label={label} style={{ position: 'absolute', top: '50%', [side]: 20, transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', zIndex: 3 }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,149,42,0.5)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ))}
    </section>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const pillars = [
  { Icon: IconAdvocacy,   title: 'Advocacy',      text: 'Championing favourable policy and funding for technical institutes — serving as a think tank to influence TVET reforms at national level.' },
  { Icon: IconStandards,  title: 'Standards',     text: 'Setting quality benchmarks in partnership with CTVET and the Ministry of Education to keep institutions competitive and nationally responsive.' },
  { Icon: IconTraining,   title: 'Skills Transfer', text: 'Facilitating technical training sessions, workshops, and facilitator exchanges that broaden expertise across member schools.' },
  { Icon: IconNetworking, title: 'Networking',    text: 'Connecting principals across all 16 regions through forums, study trips, and immersion programmes to share best practices.' },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function Home({ featuredSchools, latestPosts, settings, featuredEvents }: HomePageProps & { featuredEvents: Event[] }) {
  const stats = [
    { value: '200+', label: 'Member Schools', Icon: IconBuilding },
    { value: String(settings?.regionsCount ?? '16'), label: 'Regions', Icon: IconMap },
    { value: String(settings?.yearsOperating ?? '25+'), label: 'Years', Icon: IconCalendar },
    { value: String(settings?.trainedPrincipals ?? '1,000+'), label: 'Principals', Icon: IconUserGroup },
  ];

  return (
    <Layout
      title="COPTI — Conference of Principals of Technical Institutions"
      description="COPTI — Together for Skills, Together for Ghana. The national body representing principals of technical institutions across Ghana."
    >
      {/* ── HERO ── */}
      <HeroSlider />

      {/* ── STATS BAR ── */}
      <section className="section" style={{ background: 'white', paddingTop: 48, paddingBottom: 48 }}>
        <div className="container">
          <div className="statsGrid">
            {stats.map(({ value, label, Icon }, i) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '18px 0' }}>
                <span style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon /></span>
                <span className="statNumber" style={{ fontSize: 36, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Georgia,serif', lineHeight: 1 }}>{value}</span>
                <span className="statLabel" style={{ fontSize: 13, opacity: 0.7, marginTop: 4, color: 'var(--navy)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WELCOME MESSAGE ── */}
      <section className="section" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 56, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* President photo */}
              <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'var(--navy)',
                  border: '4px solid var(--gold)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  position: 'relative',
                }}>
                  <img
                    src="/about/Arko-Dometey.jpg"
                    alt="Arko Dometey"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    position: 'absolute', inset: 0,
                    alignItems: 'center', justifyContent: 'center',
                    background: 'var(--navy)',
                  }}>
                    <span style={{ fontSize: 64, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Georgia, serif' }}>A</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--navy)', fontSize: '1rem', textAlign: 'center' }}>Arko Dometey (Arc.)</p>
                <p style={{ margin: 0, color: 'var(--grey)', fontSize: 13, textAlign: 'center' }}>President, COPTI</p>
              </div>

              {/* Quote */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ width: 48, height: 4, background: 'var(--gold)', marginBottom: 20 }} />
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold)', marginBottom: 10 }}>
                  Message from the President
                </p>
                <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--navy)', marginBottom: 20, lineHeight: 1.3 }}>
                  Welcome to COPTI
                </h2>
                <blockquote style={{ fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--charcoal)', margin: '0 0 28px', borderLeft: '3px solid var(--gold)', paddingLeft: 20 }}>
                  &ldquo;Welcome to the official platform of the Conference of Principals of Technical
                  Institutions. As the official spokesperson and leader of this noble conference,
                  I am honoured to lead a body of professionals dedicated to the advancement of
                  Technical and Vocational Education and Training in Ghana. Our mission is to foster
                  unity, promote high professional conduct, and serve as a common forum for the
                  exchange of ideas that drive national development. COPTI is more than an
                  association — it is a movement.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SCHOOLS ── */}
      {featuredSchools.length > 0 && (
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div className="section-title">
              <h2>Featured Member Schools</h2>
              <p>A selection of technical institutions from our national directory across Ghana</p>
              <div className="title-line" />
            </div>
            <div className="schoolsGrid">
              {featuredSchools.map(school => <SchoolCard key={school._id} school={school} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/schools" className="btn btn-navy">View All Member Schools</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED EVENTS ── */}
      {featuredEvents && featuredEvents.length > 0 && (
        <section className="section" style={{ background: 'var(--light-bg)' }}>
          <div className="container">
            <div className="section-title">
              <h2>Featured Events</h2>
              <p>Upcoming and highlighted COPTI events</p>
              <div className="title-line" />
            </div>
            <div className="newsGrid">
              {featuredEvents.map(event => {
                const eventLink = event.registrationLink || `/events/${event.slug.current}`;
                const isExternal = Boolean(event.registrationLink);
                return (
                  <article key={event._id} className="newsCard">
                    <div className="newsCardImage">
                      {event.image ? (
                        isExternal ? (
                          <a href={eventLink} target="_blank" rel="noopener noreferrer">
                            <Image src={urlFor(event.image).width(600).height(340).url()} alt={event.title} width={600} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </a>
                        ) : (
                          <Link href={eventLink}>
                            <Image src={urlFor(event.image).width(600).height(340).url()} alt={event.title} width={600} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Link>
                        )
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.35 }}>
                            <rect x="6" y="8" width="36" height="32" rx="3" stroke="white" strokeWidth="2"/>
                            <path d="M6 16h36M14 24h20M14 31h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="newsCardBody">
                      <div className="newsCardMeta">
                        <span>{new Date(event.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        {event.venue && <span> | {event.venue}</span>}
                      </div>
                      {isExternal ? (
                        <h3><a href={eventLink} target="_blank" rel="noopener noreferrer">{event.title}</a></h3>
                      ) : (
                        <h3><Link href={eventLink}>{event.title}</Link></h3>
                      )}
                    </div>
                    <div className="newsCardFooter">
                      {isExternal ? (
                        <a href={eventLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Register / Details →</a>
                      ) : (
                        <Link href={eventLink} className="btn btn-outline btn-sm">View Event →</Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/events" className="btn btn-navy">View All Events</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── LATEST NEWS ── */}
      <section className="section" style={{ background: latestPosts.length > 0 ? 'white' : 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Latest News &amp; Updates</h2>
            <p>Stay informed on COPTI activities and technical education developments in Ghana</p>
            <div className="title-line" />
          </div>
          {latestPosts.length > 0 ? (
            <>
              <div className="newsGrid">
                {latestPosts.map(post => (
                  <article key={post._id} className="newsCard">
                    <div className="newsCardImage">
                      {post.mainImage ? (
                        <Link href={`/news/${post.slug.current}`}>
                          <Image src={urlFor(post.mainImage).width(600).height(340).url()} alt={post.title} width={600} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Link>
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.35 }}>
                            <rect x="6" y="8" width="36" height="32" rx="3" stroke="white" strokeWidth="2"/>
                            <path d="M6 16h36M14 24h20M14 31h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="newsCardBody">
                      <div className="newsCardMeta">
                        {post.categories?.[0] && <span className="badge badge-category">{post.categories[0].title}</span>}
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <h3><Link href={`/news/${post.slug.current}`}>{post.title}</Link></h3>
                      <p>{post.excerpt?.split(' ').slice(0, 18).join(' ')}{(post.excerpt?.split(' ').length ?? 0) > 18 ? '…' : ''}</p>
                    </div>
                    <div className="newsCardFooter">
                      <Link href={`/news/${post.slug.current}`} className="btn btn-outline btn-sm">Read More →</Link>
                    </div>
                  </article>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <Link href="/news" className="btn btn-navy">View All News</Link>
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--grey)' }}>News articles coming soon.</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ctaSection">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.12)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <IconMembership />
            </div>
          </div>
          <h2>Is Your Technical Institution a COPTI Member?</h2>
          <p>Join the national body of technical institution principals. Connect with peers across all 16 regions and help build a skilled Ghana ready to lead Africa&apos;s industrial future.</p>
          <div className="ctaButtons">
            <Link href="/contact" className="btn btn-primary btn-lg">Contact COPTI Today</Link>
            <Link href="/about" className="btn btn-secondary btn-lg">Learn More About Us</Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps & { featuredEvents: Event[] }> = async () => {
  const [allSchools, latestPosts, settings, featuredEvents] = await Promise.all([
    client.fetch<SchoolCardType[]>(SCHOOLS_QUERY).catch(() => []),
    client.fetch<PostCard[]>(LATEST_POSTS_QUERY).catch(() => []),
    client.fetch<SiteSettings | null>(SETTINGS_QUERY).catch(() => null),
    client.fetch<Event[]>(FEATURED_EVENTS_QUERY).catch(() => []),
  ]);

  const featured = (allSchools ?? []).filter(s => s.isFeatured);
  const featuredSchools = featured.length >= 6
    ? featured.slice(0, 6)
    : [...(allSchools ?? [])].sort(() => Math.random() - 0.5).slice(0, 6);

  return {
    props: {
      featuredSchools,
      latestPosts:    latestPosts    ?? [],
      settings:       settings       ?? null,
      featuredEvents: featuredEvents ?? [],
    },
    revalidate: 300,
  };
};