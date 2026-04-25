// Gallery icon for Gallery & Media section
const IconGallery = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2.5" y="4.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="7.5" cy="9" r="1.2" fill="currentColor"/>
    <path d="M4 15l3.5-4.5a1 1 0 0 1 1.6 0l2.5 3.2a1 1 0 0 0 1.6 0l2.3-3.1a1 1 0 0 1 1.6 0L18 15" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { client, SETTINGS_QUERY } from '../lib/sanity';
import type { SiteSettings } from '../types';
import { getAboutSeo, orgSchema, breadcrumbSchema, SITE_URL } from '../lib/seo';

interface AboutProps { settings: SiteSettings | null; }

// ── SVG Icons — consistent 24×24 grid, 1.6 stroke ─────────────────────────

const IconHistory = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 7v5l3.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.5 12A8.5 8.5 0 0 1 6 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M3.5 9v3H6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMission = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.5 2"/>
    <line x1="12" y1="2"  x2="12" y2="5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="2"  y1="12" x2="5"  y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconVision = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2 12C5 7 8 4.5 12 4.5S19 7 22 12c-3 5-6 7.5-10 7.5S5 17 2 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);

const IconCommitment = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.5 3 4 6.8 4 11c0 3.2 1.8 6 4.5 7.5V21h7v-2.5C18.2 17 20 14.2 20 11c0-4.2-3.5-8-8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <line x1="8.5" y1="21" x2="15.5" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9.5 11.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconOpportunity = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M9.5 4.5l1.5 1.5M14.5 4.5L13 6M12 3.5V2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconProfessionalism = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 7V5.5a4 4 0 0 1 8 0V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M7.5 13.5h9M7.5 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="11" r="1.2" fill="currentColor"/>
  </svg>
);

const IconTogetherness = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="8.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="15.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 20c0-3 2.5-5.5 6.5-5.5 1.5 0 2.8.4 3.8 1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M10 20c0-3 2.5-5.5 5.5-5.5S21 17 21 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconIntegrity = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L4 6.5v7C4 18 7.5 21.5 12 23c4.5-1.5 8-5 8-9.5v-7L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8.5 12l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconConference = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 5V3M15 5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 9h18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 13h10M6 16.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconPolicy = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L4 5v7c0 5 3 8 7 9 4-1 7-4 7-9V5L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7.5 11l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Stats Icons — consistent with above, gold stroke ──────────────────────
const IconMap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--gold)" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" stroke="var(--gold)" strokeWidth="1.8"/>
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

// ── Data ───────────────────────────────────────────────────────────────────
const coreValues = [
  { letter: 'C', title: 'Commitment',      Icon: IconCommitment,      text: "Unwavering dedication to TVET's role in national development, with continuous modernization of training methods to keep institutions relevant to Ghana's industrial and economic needs." },
  { letter: 'O', title: 'Opportunity',     Icon: IconOpportunity,     text: 'Creating pathways for learner empowerment through relevant, practical training — facilitating internships, mobility programmes, and study trips that connect learners to real-world industry.' },
  { letter: 'P', title: 'Professionalism', Icon: IconProfessionalism, text: 'Maintaining the highest standards of professional conduct among principals through skills transfer initiatives, technical workshops, and jointly developed training programmes aligned to labour market needs.' },
  { letter: 'T', title: 'Togetherness',    Icon: IconTogetherness,    text: 'Founded on unity, understanding, and brotherly solidarity. COPTI advances togetherness through institutional twinning, industrial tours, and partnerships with technical centres of excellence.' },
  { letter: 'I', title: 'Integrity',       Icon: IconIntegrity,       text: 'Embedded in governance through political neutrality and annual external financial audits. Transparency and accountability are non-negotiable pillars of everything COPTI does.' },
];

const events = [
  { Icon: IconConference, title: 'Annual General Conference (AGC)', text: "COPTI's highest decision-making body, convened annually before the academic year to set policy direction and strategic priorities for the sector." },
  { Icon: IconConference, title: 'Mid-Year Conference',             text: 'A centralized mid-year meeting to address urgent sector issues, review prior decisions, and align on emerging priorities across member institutions.' },
  { Icon: IconPolicy,     title: 'Policy Dialogue',                 text: 'Continuous engagement with the Ministry of Education, CTVET, and Ghana TVET Service on institutional and national TVET policies and reforms.' },
];

// Leadership — photo paths under /about/
const management = [
  {
    name:   'Arko Dometey (Arc.)',
    role:   'President',
    region: 'Greater Accra Region',
    bio:    'Leads the Conference of Principals of Technical Institutions as the official spokesperson, driving national TVET policy and member unity across all 16 regions of Ghana.',
    photo:  '/about/Arko-Dometey.jpg',
    initials: 'AD',
  },
  {
    name:   'Vice President',
    role:   'Vice President',
    region: '',
    bio:    "Supports the President in executing COPTI's strategic mandate and deputises in all official functions across member institutions.",
    photo:  '/about/vice-president.jpg',
    initials: 'VP',
  },
  {
    name:   'Secretary General',
    role:   'Secretary General',
    region: '',
    bio:    'Manages the administrative operations of COPTI, coordinates meetings, and maintains official records and correspondence on behalf of the conference.',
    photo:  '/about/secretary.jpg',
    initials: 'SG',
  },
  {
    name:   'Treasurer',
    role:   'Treasurer',
    region: '',
    bio:    "Oversees financial management, annual external audits, and ensures transparent stewardship of COPTI's resources in line with governance standards.",
    photo:  '/about/treasurer.jpg',
    initials: 'TR',
  },
];

const partners = [
  { name: 'Ministry of Education (MoE)', img: '/moe.jpg'       },
  { name: 'Ghana TVET Service',          img: '/ghanatvet.png' },
  { name: 'CTVET',                       img: '/ctvet.png'     },
  { name: 'National Teaching Council',   img: '/ntc.png'       },
  { name: 'Ghana Education Service',     img: '/ges.jpg'       },
];

// ── LeaderCard ─────────────────────────────────────────────────────────────
function LeaderCard({ name, role, region, bio, photo, initials }: typeof management[0]) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 4px 28px rgba(10,28,64,0.09)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.22s, box-shadow 0.22s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(10,28,64,0.14)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 28px rgba(10,28,64,0.09)';
      }}
    >
      {/* Photo area */}
      <div style={{ position: 'relative', height: 220, background: 'var(--navy)', overflow: 'hidden' }}>
        {/* Decorative stripe */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'var(--gold)', zIndex: 2 }} />
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width:768px) 100vw, 260px"
          style={{ objectFit: 'cover', objectPosition: 'top', opacity: 0.92 }}
          onError={(e) => {
            // Fallback: hide img, show initials overlay
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const fallback = el.parentElement?.querySelector('[data-fallback]') as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Initials fallback — hidden until image errors */}
        <div data-fallback="1" style={{
          display: 'none',
          position: 'absolute', inset: 0,
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--navy)',
          zIndex: 1,
        }}>
          <span style={{ fontSize: 52, fontWeight: 800, color: 'var(--gold)', letterSpacing: -2, fontFamily: 'Georgia, serif' }}>{initials}</span>
        </div>
      </div>

      {/* Text content */}
      <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: '0 0 3px', fontWeight: 800, color: 'var(--navy)', fontSize: '1rem', lineHeight: 1.3 }}>{name}</p>
        <p style={{ margin: '0 0 10px', color: 'var(--gold)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{role}</p>
        {region && (
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--grey)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {region}
          </p>
        )}
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--charcoal)', lineHeight: 1.7, flex: 1 }}>{bio}</p>
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function About({ settings }: AboutProps) {
  return (
    <Layout
      title="About Us — COPTI"
      description="Together for Skills — Together for Ghana. The Conference of Principals of Technical Institutions, uniting TVET leaders for national industrial transformation."
    >

      {/* ── HERO ── */}
      <div className="pageHero" style={{ position: 'relative', background: 'var(--navy)', minHeight: 280, display: 'flex', alignItems: 'center' }}>
        <img src="/hero/hero (1).JPG" alt="" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, zIndex: 0 }} />
        {/* subtle gold line at bottom of hero */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'var(--gold)', zIndex: 2 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <span className="current">About COPTI</span>
          </nav>
          <h1 style={{ marginTop: 16 }}>About COPTI</h1>
          <p style={{ maxWidth: 600, opacity: 0.82 }}>
            Together for Skills — Together for Ghana. The Conference of Principals of Technical
            Institutions, uniting TVET leaders for national industrial transformation.
          </p>
        </div>
      </div>

      {/* ── PRESIDENT'S MESSAGE ── */}
      <section className="section" style={{ background: 'white', paddingTop: 40, paddingBottom: 40 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto' }}>
            {/* Photo area */}
            <div style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 210, height: 210, borderRadius: '50%', background: '#f3f6fa', border: '5px solid #1A3A6B', overflow: 'hidden', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  src="/about/Arko-Dometey.jpg"
                  alt="Arko Dometey"
                  width={210}
                  height={210}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#1A3A6B', fontWeight: 800, fontSize: 22, marginBottom: 2 }}>Arko Dometey (Arc.)</div>
                <div style={{ color: '#666', fontStyle: 'italic', fontSize: 15 }}>(President, COPTI)</div>
              </div>
            </div>
            {/* Message area */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 6, height: 48, background: 'var(--gold)', borderRadius: 3 }} />
                <h2 style={{ color: '#1A3A6B', fontSize: '2.1rem', fontWeight: 800, margin: 0 }}>Welcome Message</h2>
              </div>
              <div style={{ fontSize: '1.08rem', color: 'var(--charcoal)', marginBottom: 18, lineHeight: 1.85 }}>
                Welcome to the official platform of the Conference of Principals of Technical Institutions. As the official spokesperson and leader of this noble conference, I am honoured to lead a body of professionals dedicated to the advancement of Technical and Vocational Education and Training in Ghana. Our mission is to foster unity, promote high professional conduct, and serve as a common forum for the exchange of ideas that drive national development. COPTI is more than an association — it is a movement.
              </div>
              <blockquote style={{ fontStyle: 'italic', color: '#1A3A6B', fontWeight: 700, fontSize: '1.13rem', borderLeft: '4px solid var(--gold)', paddingLeft: 18, margin: 0 }}>
                "Together for Skills — Together for Ghana."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="aboutStory">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--navy)',
                color: 'var(--gold)',
                padding: '6px 16px 6px 10px',
                borderRadius: 24,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.9px',
                marginBottom: 20,
              }}>
                <IconHistory />
                <span>Our Story</span>
              </div>
              <h2 style={{ marginBottom: 20 }}>The History of COPTI</h2>
              <p>
                The Conference of Principals of Technical Institutions (COPTI) is an association
                of principals of public technical institutions in Ghana. It serves as a
                professional body partnering with the Ministry of Education, the Commission for
                Technical and Vocational Education and Training (CTVET), and the Ghana TVET
                Service to formulate, regulate, and implement TVET policies.
              </p>
              <p>
                Over the years COPTI has grown into a respected national body that advocates for
                policy improvements, facilitates professional development, and builds bridges
                between technical institutes and the industries they serve.
              </p>
              <p>
                Today, with over <strong>{settings?.totalSchools ?? '200'} member schools</strong>{' '}
                across all 16 regions of Ghana, COPTI continues its mission — shaping institutions
                and leading Ghana&apos;s industrial transformation through TVET excellence.
              </p>
            </div>

            {/* Stats panel */}
            <div style={{
              background: 'var(--navy)',
              borderRadius: 16,
              minHeight: 360,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
              padding: '44px 36px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* subtle top-right corner accent */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', border: '1.5px solid rgba(201,149,42,0.18)' }} />
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', border: '1.5px solid rgba(201,149,42,0.10)' }} />

              {/* School icon */}
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect x="8" y="28" width="56" height="38" rx="3" stroke="var(--gold)" strokeWidth="2.2"/>
                <path d="M8 40h56" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M28 66V52h16v14" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M2 30L36 8l34 22" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="round"/>
                <circle cx="36" cy="19" r="3" stroke="var(--gold)" strokeWidth="2"/>
              </svg>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--gold)', lineHeight: 1, fontFamily: 'Georgia, serif' }}>
                  200+
                </div>
                <div style={{ fontSize: 13, opacity: 0.65, marginTop: 6, letterSpacing: '0.5px' }}>Member Schools Nationwide</div>
              </div>

              <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)' }} />

              <div style={{ display: 'flex', gap: 0, width: '100%', justifyContent: 'space-around', textAlign: 'center' }}>
                {[
                  { value: '16',                                         label: 'Regions',    Icon: IconMap      },
                  { value: `${settings?.yearsOperating ?? '25'}+`,       label: 'Years',      Icon: IconCalendar },
                  { value: `${settings?.trainedPrincipals ?? '1K'}+`,    label: 'Principals', Icon: IconUserGroup },
                ].map(({ value, label, Icon }, i, arr) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, position: 'relative' }}>
                    {i > 0 && <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 1, background: 'rgba(255,255,255,0.1)' }} />}
                    <Icon />
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.4px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE LEADERSHIP ── */}
      <section className="section" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Executive Leadership</h2>
            <p>The management team steering COPTI&apos;s national mandate</p>
            <div className="title-line" />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 28,
          }}>
            {management.map((person) => (
              <LeaderCard key={person.role} {...person} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Mission &amp; Vision</h2>
            <div className="title-line" />
          </div>
          <div className="mvGrid">
            <div className="missionCard">
              <div style={{
                width: 52,
                height: 52,
                background: 'rgba(255,255,255,0.14)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <IconMission />
              </div>
              <h3>Our Mission</h3>
              <p>To foster unity among principals, promote the development of Technical and Vocational Education nationwide, partner with professional associations locally and internationally, and serve as a common forum for the exchange of ideas that drive national development.</p>
            </div>
            <div className="visionCard">
              <div style={{
                width: 52,
                height: 52,
                background: 'rgba(255,255,255,0.14)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <IconVision />
              </div>
              <h3>Our Vision</h3>
              <p>A Ghana where every technical institution is excellently led, well-resourced, and producing globally competitive graduates — with COPTI driving Africa&apos;s industrial future through TVET excellence, skills innovation, and strategic partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY OBJECTIVES ── */}
      <section className="section-sm" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Key Objectives</h2>
            <div className="title-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {[
              'Foster unity and understanding among all member principals.',
              'Promote the development of TVET institutions nationwide.',
              'Educate members on their rights and responsibilities.',
              'Partner with professional associations locally and internationally.',
              'Advocate for favourable TVET policies at ministerial and national level.',
              'Align training programmes with regional and national labour market demands.',
            ].map((obj, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '20px 22px',
                background: 'white',
                borderRadius: 14,
                boxShadow: '0 2px 10px rgba(20,40,80,0.07)',
                minHeight: 100,
              }}>
                <span style={{
                  minWidth: 30,
                  height: 30,
                  background: 'var(--navy)',
                  color: 'var(--gold)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  flexShrink: 0,
                }}>{i + 1}</span>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--charcoal)', fontWeight: 500 }}>{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>Five principles — embodied in the COPTI name itself — that guide our identity and mandate</p>
            <div className="title-line" />
          </div>
          <div className="valuesGrid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 28 }}>
            {coreValues.map(({ letter, title, Icon, text }) => (
              <div key={title} className="valueCard" style={{
                padding: '30px 24px 26px',
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 2px 14px rgba(20,40,80,0.08)',
                border: '1px solid rgba(20,40,80,0.05)',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}>
                {/* Icon box */}
                <div style={{
                  width: 50,
                  height: 50,
                  background: 'var(--navy)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  color: 'var(--gold)',
                  flexShrink: 0,
                }}>
                  <Icon />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: 'var(--gold)',
                    background: 'rgba(201,149,42,0.10)',
                    padding: '2px 10px',
                    borderRadius: 8,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}>{letter}</span>
                  <h4 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>{title}</h4>
                </div>
                <p style={{ margin: 0, lineHeight: 1.75, fontSize: 14.5, color: 'var(--charcoal)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS & EVENTS ── */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ color: 'white' }}>Projects &amp; Events</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)' }}>Key platforms through which COPTI delivers its mandate</p>
            <div className="title-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 22 }}>
            {events.map(({ Icon, title, text }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                padding: '30px 26px',
                border: '1px solid rgba(255,255,255,0.09)',
                transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 46,
                  height: 46,
                  background: 'var(--gold)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  color: 'white',
                }}>
                  <Icon />
                </div>
                <h3 style={{ color: 'white', fontSize: 16, marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATIONS ── */}
      <section className="section-sm" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Affiliations &amp; Partners</h2>
            <div className="title-line" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
            {partners.map(({ name, img }) => (
              <div key={name} style={{
                background: 'white',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '18px 22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 140,
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={name}
                  style={{ width: 88, height: 52, objectFit: 'contain', marginBottom: 10 }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <span style={{ fontSize: 12, color: 'var(--navy)', textAlign: 'center', fontWeight: 600 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ctaSection">
        <div className="container">
          <h2>Want to Learn More?</h2>
          <p>Contact the COPTI Secretariat — we&apos;d love to hear from you.</p>
          <div className="ctaButtons">
            <Link href="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
            <Link href="/schools" className="btn btn-secondary btn-lg">View Member Schools</Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const settings = await client.fetch<SiteSettings>(SETTINGS_QUERY).catch(() => null);
  return { props: { settings: settings ?? null }, revalidate: 3600 };
};