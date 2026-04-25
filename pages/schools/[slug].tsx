import { useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Layout from '../../components/layout/Layout';
import { client, SCHOOL_BY_SLUG_QUERY, SCHOOL_SLUGS_QUERY, urlFor } from '../../lib/sanity';
import { getSchoolProfileSeo, schoolSchema, orgSchema, breadcrumbSchema, SITE_URL } from '../../lib/seo';
import type { SchoolProfileProps, School } from '../../types';

// ── Helpers ────────────────────────────────────────────────────────────────
function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 8, fontWeight: 700 }}>{children}</h2>
      <div style={{ width: 36, height: 3, background: 'var(--gold)', borderRadius: 2 }} />
    </div>
  );
}

function InfoRow({ icon, label, children }: { icon: string; label?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 14 }}>
      <i className={icon} style={{ color: 'var(--gold)', width: 16, marginTop: 2, flexShrink: 0 }} />
      <div style={{ lineHeight: 1.5 }}>
        {label && <span style={{ fontWeight: 600, color: 'var(--navy)', marginRight: 6 }}>{label}</span>}
        {children}
      </div>
    </div>
  );
}

function NavyCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e8edf5', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      <div style={{ background: 'var(--navy)', color: 'white', padding: '12px 18px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-btn)' }}>
        <i className={icon} style={{ color: 'var(--gold)' }} /> {title}
      </div>
      <div style={{ padding: '16px 18px' }}>{children}</div>
    </div>
  );
}

function ProfileCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e8edf5', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', padding: 28, marginBottom: 20, scrollMarginTop: 80 }}>
      <SectionHead>{title}</SectionHead>
      {children}
    </div>
  );
}

const TABS = [
  { href: '#about',        label: 'About'        },
  { href: '#programmes',   label: 'Programmes'   },
  { href: '#facilities',   label: 'Facilities'   },
  { href: '#achievements', label: 'Achievements' },
];

export default function SchoolProfile({ school }: SchoolProfileProps) {
  const [activeTab, setActiveTab] = useState('#about');

  if (!school) {
    return (
      <Layout title="School Not Found - COPTI Ghana" description="The school profile you are looking for cannot be found. It may have been removed.">
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <h3>School not found</h3>
          <p style={{ color: 'var(--grey)', marginBottom: 24 }}>This profile may have been removed.</p>
          <Link href="/schools" className="btn btn-primary">Back to Directory</Link>
        </div>
      </Layout>
    );
  }

  const {
    name, schoolType, region, district, phone, email, website, motto,
    shortDescription, fullProfile, yearEstablished, ictLevel,
    gpsCoordinates, gpsAddress, boardingFacilities, logo, gallery,
    principal, programmes, programmeDuration, coreSubjects,
    entryRequirements, industryLinkage, facilities, industry,
    achievements, social,
  } = school;

  const typeSlug = (schoolType ?? '').toLowerCase().replace(/\s+/g, '-');

  let mapLat = '', mapLng = '';
  if (gpsCoordinates) {
    const parts = gpsCoordinates.split(',');
    if (parts.length >= 2) { mapLat = parts[0].trim(); mapLng = parts[1].trim(); }
  }

  const progList = programmes
    ? programmes.split('\n').map(p => p.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
    : [];

  const facilityItems: [string, string, string | undefined][] = [
    ['fa-screwdriver-wrench', 'Workshops',         facilities?.workshopsAvailable],
    ['fa-gears',              'Workshop Cond.',     facilities?.workshopCondition],
    ['fa-chalkboard',         'Classrooms',         facilities?.classroomsStatus],
    ['fa-building',           'Admin Block',        facilities?.adminBlock],
    ['fa-laptop',             'ICT Infrastructure', facilities?.ictInfrastructure],
    ['fa-bed',                'Boarding',           boardingFacilities],
    ['fa-house-user',         'Staff Housing',      facilities?.staffAccommodation],
    ['fa-bus',                'School Vehicle',     facilities?.schoolVehicle],
  ];

  // Quick facts for horizontal strip
  const quickFacts = [
    { icon: 'fa fa-map',          label: 'Region',      value: region },
    { icon: 'fa fa-location-dot', label: 'District',    value: district },
    { icon: 'fa fa-calendar',     label: 'Established', value: yearEstablished ? String(yearEstablished) : undefined },
    { icon: 'fa fa-bed',          label: 'Boarding',    value: boardingFacilities },
    { icon: 'fa fa-laptop',       label: 'ICT Level',   value: ictLevel },
    { icon: 'fa fa-tag',          label: 'Type',        value: schoolType },
    { icon: 'fa fa-chart-line',   label: 'Employment',  value: industry?.graduateEmploymentPct ? `${industry.graduateEmploymentPct}%` : undefined },
  ].filter(f => Boolean(f.value));

  const pageUrl   = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const pageTitle = encodeURIComponent(name ?? '');

  return (
    <Layout
      title={`${name} - COPTI Ghana`}
      description={shortDescription ?? `${name} — COPTI Member School in ${region ?? 'Ghana'}`}
      keywords={`${name}, COPTI, Ghana, Technical School, Vocational, Education, ${region ?? ''}, ${district ?? ''}`}
    >
      <style>{`
        @media (max-width: 900px) {
          .profile-layout   { grid-template-columns: 1fr !important; }
          .profile-sidebar  { position: static !important; }
        }
        @media (max-width: 768px) {
          .info-cards-row   { grid-template-columns: 1fr !important; }
          .facilities-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .hero-inner       { flex-direction: column !important; gap: 16px !important; }
          .hero-logo        { width: 72px !important; height: 72px !important; font-size: 26px !important; }
          .quick-facts-strip{ flex-wrap: wrap !important; }
          .gallery-grid     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .facilities-grid  { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* BREADCRUMB */}
      <div style={{ background: '#f8fafd', borderBottom: '1px solid #e8edf5', padding: '12px 0' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--grey)', flexWrap: 'wrap' }}>
            <Link href="/"        style={{ color: 'var(--grey)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/schools" style={{ color: 'var(--grey)', textDecoration: 'none' }}>Member Schools</Link>
            <span>/</span>
            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{name}</span>
          </nav>
        </div>
      </div>

      {/* HERO CARD */}
      <div style={{ background: '#f0f4fa', padding: '28px 0 0' }}>
        <div className="container">
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(26,58,107,0.12)' }}>

            {/* Navy top */}
            <div style={{ background: 'var(--navy)', padding: '32px 32px 28px', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(201,149,42,0.10)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -60, right: 80,  width: 140, height: 140, borderRadius: '50%', background: 'rgba(201,149,42,0.06)', pointerEvents: 'none' }} />

              {/* Faint logo background accent */}
              {logo && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.07,
                  zIndex: 0,
                  pointerEvents: 'none',
                  width: 340,
                  height: 340,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    src={urlFor(logo).width(340).height(340).url()}
                    alt="School logo faint background"
                    width={340}
                    height={340}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'blur(0.5px)' }}
                  />
                </div>
              )}

              <div className="hero-inner" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                {/* LOGO — prominent in hero */}
                {logo ? (
                  <div className="hero-logo" style={{ width: 90, height: 90, borderRadius: 14, overflow: 'hidden', background: 'white', padding: 8, flexShrink: 0, border: '3px solid rgba(201,149,42,0.5)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={urlFor(logo).width(180).height(180).url()} alt={name} width={90} height={90} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div className="hero-logo" style={{ width: 90, height: 90, borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(201,149,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800, color: 'var(--gold)', flexShrink: 0, fontFamily: 'var(--font-head)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                    {name?.charAt(0)}
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h1 style={{ color: 'white', fontSize: 'clamp(1.4rem,3.5vw,2rem)', marginBottom: 6, lineHeight: 1.2, fontWeight: 800 }}>{name}</h1>
                  {motto && <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.95rem', marginBottom: 12, opacity: 0.9 }}>&ldquo;{motto}&rdquo;</p>}
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {schoolType && (
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 12px', borderRadius: 6, background: 'rgba(201,149,42,0.2)', color: 'var(--gold)', border: '1px solid rgba(201,149,42,0.3)', fontFamily: 'var(--font-btn)' }}>{schoolType}</span>
                    )}
                    {region && (
                      <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 600 }}>
                        <i className="fa fa-map" style={{ marginRight: 5, color: 'var(--gold)' }} />{region}
                      </span>
                    )}
                    {yearEstablished && <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 600 }}>Est. {yearEstablished}</span>}
                    {ictLevel        && <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 600 }}>ICT: {ictLevel}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK FACTS HORIZONTAL STRIP — right under hero */}
            {quickFacts.length > 0 && (
              <div className="quick-facts-strip" style={{ background: '#f8fafd', borderTop: '3px solid var(--gold)', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {quickFacts.map(({ icon, label, value }, i) => (
                  <div key={label} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '14px 20px', flex: '0 0 auto',
                    borderRight: i < quickFacts.length - 1 ? '1px solid #e8edf5' : 'none',
                    minWidth: 100,
                  }}>
                    <i className={icon} style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 5 }} />
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--grey)', fontFamily: 'var(--font-btn)', fontWeight: 700, marginBottom: 3 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', lineHeight: 1.3 }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TABS */}
            <div style={{ background: 'white', borderTop: quickFacts.length > 0 ? 'none' : '3px solid var(--gold)' }}>
              <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 12px' }}>
                {TABS.map(({ href, label }) => (
                  <a key={href} href={href}
                    onClick={() => setActiveTab(href)}
                    style={{ fontSize: 13, fontWeight: 600, padding: '13px 20px', color: activeTab === href ? 'var(--navy)' : 'var(--grey)', textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-block', borderBottom: activeTab === href ? '3px solid var(--gold)' : '3px solid transparent', transition: 'all 0.15s', fontFamily: 'var(--font-btn)' }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ background: '#f8fafd', padding: '28px 0 80px' }}>
        <div className="container">
          <Link href="/schools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--navy)', fontSize: 13, fontWeight: 700, textDecoration: 'none', marginBottom: 24, fontFamily: 'var(--font-btn)' }}>
            <i className="fa fa-arrow-left" style={{ fontSize: 11 }} /> Back to All Schools
          </Link>

          <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

            {/* MAIN */}
            <div style={{ minWidth: 0 }}>

              {/* INFO CARDS ROW */}
              <div className="info-cards-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>

                <NavyCard icon="fa fa-address-book" title="Contact">
                  {phone      && <InfoRow icon="fa fa-phone"><a href={`tel:${phone}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{phone}</a></InfoRow>}
                  {email      && <InfoRow icon="fa fa-envelope"><a href={`mailto:${email}`} style={{ color: 'var(--navy)', wordBreak: 'break-all' }}>{email}</a></InfoRow>}
                  {gpsAddress && <InfoRow icon="fa fa-map-location-dot">{gpsAddress}</InfoRow>}
                  {website    && <InfoRow icon="fa fa-globe"><a href={website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)', wordBreak: 'break-all' }}>{website.replace(/^https?:\/\//, '').slice(0, 26)}</a></InfoRow>}
                  {social && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {social.facebook  && <a href={social.facebook}  target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:'50%',background:'#1877F2',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,textDecoration:'none' }}><i className="fab fa-facebook-f" /></a>}
                      {social.twitter   && <a href={social.twitter}   target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:'50%',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,textDecoration:'none' }}><i className="fab fa-x-twitter" /></a>}
                      {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:'50%',background:'#E1306C',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,textDecoration:'none' }}><i className="fab fa-instagram" /></a>}
                      {social.tiktok    && <a href={social.tiktok}    target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:'50%',background:'#000000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,textDecoration:'none' }}><i className="fab fa-tiktok" /></a>}
                      {social.youtube   && <a href={social.youtube}   target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:'50%',background:'#FF0000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,textDecoration:'none' }}><i className="fab fa-youtube" /></a>}
                    </div>
                  )}
                </NavyCard>

                <NavyCard icon="fa fa-school" title="School Details">
                  {yearEstablished    && <InfoRow icon="fa fa-calendar"     label="Est.">{yearEstablished}</InfoRow>}
                  {region             && <InfoRow icon="fa fa-map"          label="Region">{region}</InfoRow>}
                  {district           && <InfoRow icon="fa fa-location-dot" label="District">{district}</InfoRow>}
                  {schoolType         && <InfoRow icon="fa fa-tag"          label="Type">{schoolType}</InfoRow>}
                  {ictLevel           && <InfoRow icon="fa fa-laptop"       label="ICT">{ictLevel}</InfoRow>}
                  {boardingFacilities && <InfoRow icon="fa fa-bed"          label="Boarding">{boardingFacilities}</InfoRow>}
                </NavyCard>

                <NavyCard icon="fa fa-user-tie" title="Principal">
                  {principal?.name  && <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 8 }}>{principal.name}</p>}
                  {principal?.phone && <InfoRow icon="fa fa-phone"><a href={`tel:${principal.phone}`} style={{ color: 'var(--navy)' }}>{principal.phone}</a></InfoRow>}
                  {principal?.email && <InfoRow icon="fa fa-envelope"><a href={`mailto:${principal.email}`} style={{ color: 'var(--navy)', wordBreak: 'break-all' }}>{principal.email}</a></InfoRow>}
                  {principal?.otherContacts && (
                    <details style={{ marginTop: 10 }}>
                      <summary style={{ fontSize: 12, color: 'var(--grey)', cursor: 'pointer', fontWeight: 600 }}>Other Contacts</summary>
                      <p style={{ fontSize: 12, color: 'var(--grey)', marginTop: 6, lineHeight: 1.6 }}>
                        {principal.otherContacts.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
                      </p>
                    </details>
                  )}
                  {!principal?.name && !principal?.phone && !principal?.email && (
                    <p style={{ fontSize: 13, color: 'var(--grey)' }}>Not available.</p>
                  )}
                </NavyCard>
              </div>

              {/* ABOUT */}
              {(shortDescription || fullProfile) && (
                <ProfileCard id="about" title={`About ${name}`}>
                  {shortDescription && <p style={{ fontSize: '1.05rem', color: 'var(--navy)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.7 }}>{shortDescription}</p>}
                  {fullProfile && <div style={{ lineHeight: 1.85, fontSize: '1rem' }}><PortableText value={fullProfile} /></div>}
                </ProfileCard>
              )}

              {/* PROGRAMMES */}
              {progList.length > 0 && (
                <ProfileCard id="programmes" title="Programmes Offered">
                  {programmeDuration && (
                    <p style={{ fontSize: 14, color: 'var(--grey)', marginBottom: 14 }}>
                      <i className="fa fa-clock" style={{ marginRight: 6, color: 'var(--gold)' }} />
                      Duration: <strong>{programmeDuration}</strong>
                    </p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                    {progList.map((p, i) => (
                      <span key={i} style={{ background: 'var(--navy)', color: 'white', padding: '7px 16px', borderRadius: 24, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-btn)' }}>{p}</span>
                    ))}
                  </div>
                  {coreSubjects && (
                    <div style={{ background: '#f8fafd', borderRadius: 8, padding: '14px 16px', marginTop: 12, border: '1px solid #e8edf5' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--grey)', marginBottom: 6 }}>Core Subjects</p>
                      <p style={{ fontSize: 14, color: 'var(--charcoal)', margin: 0 }}>{coreSubjects}</p>
                    </div>
                  )}
                  {entryRequirements && (
                    <div style={{ background: '#f8fafd', borderRadius: 8, padding: '14px 16px', marginTop: 10, border: '1px solid #e8edf5' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--grey)', marginBottom: 6 }}>Entry Requirements</p>
                      <p style={{ fontSize: 14, color: 'var(--charcoal)', margin: 0 }}>{entryRequirements}</p>
                    </div>
                  )}
                </ProfileCard>
              )}

              {/* FACILITIES */}
              <ProfileCard id="facilities" title="Facilities & Infrastructure">
                {facilityItems.filter(([,,v]) => Boolean(v)).length > 0 ? (
                  <div className="facilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                    {facilityItems.filter(([,,v]) => Boolean(v)).map(([icon, label, value]) => (
                      <div key={label} style={{ background: '#f8fafd', border: '1px solid #e8edf5', borderRadius: 10, padding: '16px 10px', textAlign: 'center', transition: 'border-color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#e8edf5'}>
                        <i className={`fa ${icon}`} style={{ fontSize: 22, display: 'block', marginBottom: 6, color: 'var(--navy)' }} />
                        <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--grey)', marginBottom: 4 }}>{label}</span>
                        <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: 'var(--grey)' }}>Facilities information not yet available.</p>
                )}
              </ProfileCard>

              {/* INDUSTRY */}
              {(industry?.partnerIndustries || industry?.graduateEmploymentPct) && (
                <ProfileCard id="industry" title="Industry Linkage & Employment">
                  {industryLinkage               && <p style={{ fontSize: 14, marginBottom: 8 }}><strong>WEL Programme:</strong> {industryLinkage}</p>}
                  {industry?.welParticipation    && <p style={{ fontSize: 14, marginBottom: 8 }}><strong>WEL Participation:</strong> {industry.welParticipation}</p>}
                  {industry?.jobPlacementSupport && <p style={{ fontSize: 14, marginBottom: 16 }}><strong>Job Placement:</strong> {industry.jobPlacementSupport}</p>}
                  {industry?.partnerIndustries && (
                    <div style={{ background: '#f8fafd', borderRadius: 8, padding: '14px 16px', marginBottom: 16, border: '1px solid #e8edf5' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--grey)', marginBottom: 6 }}>Partner Industries</p>
                      <p style={{ fontSize: 14, margin: 0 }}>{industry.partnerIndustries}</p>
                    </div>
                  )}
                  {industry?.graduateEmploymentPct && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'center', background: 'var(--navy)', borderRadius: 12, padding: '24px 28px' }}>
                      <div style={{ fontSize: 52, fontWeight: 800, color: 'var(--gold)', lineHeight: 1, fontFamily: 'var(--font-head)' }}>{industry.graduateEmploymentPct}%</div>
                      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>Estimated graduates who are employed or self-employed</div>
                    </div>
                  )}
                </ProfileCard>
              )}

              {/* ACHIEVEMENTS */}
              {(achievements?.majorAchievements || achievements?.awards || achievements?.studentProjects || achievements?.innovationInitiatives) && (
                <ProfileCard id="achievements" title="Achievements & Recognition">
                  {[
                    { icon: 'fa fa-trophy',     label: 'Major Achievements',             value: achievements?.majorAchievements },
                    { icon: 'fa fa-medal',      label: 'Awards & Recognitions',          value: achievements?.awards },
                    { icon: 'fa fa-microscope', label: 'Notable Student Projects',       value: achievements?.studentProjects },
                    { icon: 'fa fa-lightbulb',  label: 'Innovation & Entrepreneurship', value: achievements?.innovationInitiatives },
                  ].filter(a => a.value).map(({ icon, label, value }) => (
                    <div key={label} style={{ marginBottom: 16, padding: 16, background: '#f8fafd', borderRadius: 10, border: '1px solid #e8edf5' }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.92rem', marginBottom: 8, color: 'var(--navy)' }}>
                        <i className={icon} style={{ color: 'var(--gold)' }} />{label}
                      </h4>
                      <p style={{ fontSize: 14, color: 'var(--grey)', lineHeight: 1.7, margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </ProfileCard>
              )}

              {/* GALLERY */}
              {gallery && gallery.filter(img => img?.asset?._ref).length > 0 && (
  <ProfileCard id="gallery" title="Photo Gallery">
    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
      {gallery.filter(img => img?.asset?._ref).map((img, i) => (
                      <a key={i} href={urlFor(img).url()} target="_blank" rel="noopener noreferrer"
                        style={{ borderRadius: 10, overflow: 'hidden', display: 'block', aspectRatio: '4/3' }}>
                        <Image src={urlFor(img).width(500).height(375).url()} alt={`${name} photo ${i+1}`}
                          width={500} height={375}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                          onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'} />
                      </a>
                    ))}
                  </div>
                </ProfileCard>
              )}

              {/* ENQUIRY */}
              <ProfileCard id="enquiry" title="Send an Enquiry">
                <p style={{ color: 'var(--grey)', marginBottom: 24, fontSize: 14 }}>
                  Have a question about {name}? Fill in the form and we&apos;ll get back to you.
                </p>
                <EnquiryForm schoolName={name} />
              </ProfileCard>
            </div>

            {/* SIDEBAR */}
            <aside className="profile-sidebar" style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Map */}
              {mapLat && mapLng && (
                <NavyCard icon="fa fa-location-dot" title="Location">
                  <div style={{ height: 190, borderRadius: 8, overflow: 'hidden', margin: '-4px -4px 12px' }}>
                    <iframe
                      src={`https://www.google.com/maps?q=${mapLat},${mapLng}&z=15&output=embed`}
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${name} location`}
                      style={{ width: '100%', height: '100%', border: 0 }}
                    />
                  </div>
                  {gpsAddress && <p style={{ fontSize: 11, color: 'var(--grey)', marginBottom: 10 }}><i className="fa fa-map-pin" style={{ marginRight: 5 }} />{gpsAddress}</p>}
                  <a href={`https://www.google.com/maps?q=${mapLat},${mapLng}`} target="_blank" rel="noopener noreferrer"
                    className="btn btn-navy btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    <i className="fa fa-diamond-turn-right" /> Get Directions
                  </a>
                </NavyCard>
              )}

              {/* Share */}
              <NavyCard icon="fa fa-share-nodes" title="Share This School">
                <div style={{ display: 'flex', gap: 8 }}>
                  {([
                    ['fab fa-facebook-f', '#1877F2', `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,            'Facebook'],
                    ['fab fa-whatsapp',   '#25D366', `https://wa.me/?text=${pageTitle}%20${pageUrl}`,                       'WhatsApp'],
                    ['fab fa-x-twitter',  '#000000', `https://x.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`,         'X'],
                  ] as [string, string, string, string][]).map(([icon, bg, href, label]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flex: 1, padding: '9px 6px', background: bg, color: 'white', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: 'var(--font-btn)' }}>
                      <i className={icon} style={{ fontSize: 13 }} />
                      {label}
                    </a>
                  ))}
                </div>
              </NavyCard>

              <Link href="/schools" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fa fa-arrow-left" /> All Member Schools
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ── Enquiry Form ───────────────────────────────────────────────────────────
function EnquiryForm({ schoolName }: { schoolName: string }) {
  type Status = 'idle' | 'sending' | 'sent' | 'error';
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending');
    try {
      await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, school: schoolName }) });
      setStatus('sent');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div style={{ background: '#d4edda', color: '#155724', padding: '14px 18px', borderRadius: 8, border: '1px solid #c3e6cb', fontSize: 14 }}>
      <i className="fa fa-check-circle" style={{ marginRight: 8 }} />
      Message sent. COPTI will respond within 2–3 working days.
    </div>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 560 }}>
      {[
        { id: 'eq-name',  name: 'name',  label: 'Full Name *',     type: 'text',  required: true  },
        { id: 'eq-email', name: 'email', label: 'Email Address *', type: 'email', required: true  },
        { id: 'eq-phone', name: 'phone', label: 'Phone Number',    type: 'tel',   required: false },
      ].map(({ id, name, label, type, required }) => (
        <div key={id} className="formGroup">
          <label htmlFor={id}>{label}</label>
          <input id={id} name={name} type={type} value={(form as any)[name]} onChange={handle} required={required} />
        </div>
      ))}
      <div className="formGroup">
        <label htmlFor="eq-message">Message *</label>
        <textarea id="eq-message" name="message" value={form.message} onChange={handle} rows={5} required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Enquiry →'}
      </button>
      {status === 'error' && <p style={{ color: 'red', marginTop: 10, fontSize: 13 }}>Something went wrong. Please try again.</p>}
    </form>
  );
}

// ── Static paths & props ───────────────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch<{ slug: string }[]>(SCHOOL_SLUGS_QUERY).catch(() => []);
  return { paths: (slugs ?? []).map(s => ({ params: { slug: s.slug } })), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<SchoolProfileProps> = async ({ params }) => {
  const school = await client.fetch<School>(SCHOOL_BY_SLUG_QUERY, { slug: params?.slug as string }).catch(() => null);
  if (!school) return { notFound: true };
  return { props: { school }, revalidate: 1800 };
};