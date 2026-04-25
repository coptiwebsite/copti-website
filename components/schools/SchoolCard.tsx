import Link from 'next/link';
import Image from 'next/image';
import type { SchoolCard as SchoolCardType } from '../../types';
import { urlFor } from '../../lib/sanity';

interface Props { school: SchoolCardType; }

export default function SchoolCard({ school }: Props) {
  const {
    name, slug, schoolType, region, district,
    phone, logo, programmes, shortDescription, yearEstablished,
  } = school;

  const slugStr  = typeof slug === 'string' ? slug : slug?.current ?? '';
  const initial  = name?.charAt(0).toUpperCase() ?? '?';
  const typeSlug = (schoolType ?? '').toLowerCase().replace(/\s+/g, '-');

  const typeConfig: Record<string, { bg: string; color: string }> = {
    'district-assembly':     { bg: 'rgba(201,149,42,0.18)', color: 'var(--gold)'   },
    'municipal-assembly':    { bg: 'rgba(201,149,42,0.18)', color: 'var(--gold)'   },
    'metropolitan-assembly': { bg: 'rgba(201,149,42,0.18)', color: 'var(--gold)'   },
    government:              { bg: 'rgba(201,149,42,0.18)', color: 'var(--gold)'   },
    private:                 { bg: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' },
    tvet:                    { bg: 'rgba(201,149,42,0.18)', color: 'var(--gold)'   },
  };
  const tc = typeConfig[typeSlug] ?? { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' };

  const progList: string[] = programmes
    ? programmes.split('\n').map(p => p.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
    : [];

  return (
    <article style={{
      background: 'white', borderRadius: 10, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      border: '1px solid #dde4f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(-3px)';
      el.style.boxShadow = '0 8px 24px rgba(26,58,107,0.13)';
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(0)';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
    }}>

      {/* NAVY HEADER */}
      <div style={{ background: 'var(--navy)', padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
        {logo ? (
          <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'white', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={urlFor(logo).width(96).height(96).url()} alt={`${name} logo`} width={48} height={48} style={{ objectFit: 'contain', padding: 3 }} />
          </div>
        ) : (
          <div style={{ width: 48, height: 48, borderRadius: 8, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-head)' }}>
            {initial}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '0.93rem', fontWeight: 700, color: 'white', marginBottom: 6, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-head)' }}>
            <Link href={`/schools/${slugStr}`} style={{ color: 'inherit', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>
              {name}
            </Link>
          </h3>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {schoolType && (
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '2px 8px', borderRadius: 4, background: tc.bg, color: tc.color, border: '1px solid rgba(201,149,42,0.25)', fontFamily: 'var(--font-btn)' }}>
                {schoolType}
              </span>
            )}
            {yearEstablished && (
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-btn)' }}>
                Est. {yearEstablished}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* GOLD RULE */}
      <div style={{ height: 3, background: 'var(--gold)' }} />

      {/* BODY */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        {(region || district) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 13, color: 'var(--grey)' }}>
            <i className="fa fa-location-dot" style={{ color: 'var(--gold)', fontSize: 11, width: 14 }} />
            {[region, district].filter(Boolean).join(', ')}
          </div>
        )}
        {phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 13 }}>
            <i className="fa fa-phone" style={{ color: 'var(--navy)', fontSize: 11, opacity: 0.5, width: 14 }} />
            <a href={`tel:${phone}`} style={{ color: 'var(--charcoal)', textDecoration: 'none' }}>{phone}</a>
          </div>
        )}
        {shortDescription && (
          <p style={{ fontSize: 13, color: 'var(--grey)', lineHeight: 1.6, margin: '10px 0 0' }}>
            {shortDescription.split(' ').slice(0, 18).join(' ')}{shortDescription.split(' ').length > 18 ? '…' : ''}
          </p>
        )}
        {progList.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
            {progList.slice(0, 3).map((p, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: '#f0f4fa', color: 'var(--navy)', border: '1px solid #dde4f0', fontFamily: 'var(--font-btn)' }}>{p}</span>
            ))}
            {progList.length > 3 && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: 'var(--gold)', color: 'white', fontFamily: 'var(--font-btn)' }}>+{progList.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 20px 18px' }}>
        <Link href={`/schools/${slugStr}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '10px 0', background: 'var(--navy)', color: 'white', borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'background 0.18s', fontFamily: 'var(--font-btn)' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--navy)'}>
          View Profile
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}